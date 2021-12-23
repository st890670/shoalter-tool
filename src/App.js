/*global chrome*/
import { useEffect, useState } from "react";

function App() {
  const [currentURL, setCurrentURL] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab?.url) {
      setCurrentURL(new URL(tab.url));
    }
  }

  async function handleClickAddCookie() {
    try {
      await chrome.cookies.set({
        url: `${currentURL?.protocol}//${currentURL?.hostname}`,
        name: "test",
        value: "true",
      });

      setMessage(`add test cookie success.`);
    } catch (error) {
      setMessage(`Unexpected error: ${error.message}`);
    }
  }

  async function handleRemoveAllCookies() {
    try {
      const cookies = await chrome.cookies.getAll({
        domain: currentURL.hostname,
      });
      let pendingPromises = cookies.map(deleteCookie);
      await Promise.all(pendingPromises);
      setMessage(`remove cookies of ${currentURL.hostname} success`);
    } catch (error) {
      setMessage(`Unexpected error: ${error.message}`);
    }
  }

  function deleteCookie(cookie) {
    const protocol = cookie.secure ? "https:" : "http:";
    const cookieUrl = `${protocol}//${cookie.domain}${cookie.path}`;
    return chrome.cookies.remove({
      url: cookieUrl,
      name: cookie.name,
      storeId: cookie.storeId,
    });
  }

  return (
    <div className="App">
      <div class="shoalter-tool">
        <div class="header">
          <h4>Shoalter Tool</h4>
          <div class="Author">author: Jason Jiang</div>
        </div>

        <div class="content">
          {/* <div class="card mb-3">
            <div class="card-body">
              <div class="card-title">test</div>
              <div class="card-subtitle mb-2 text-muted">test</div>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div> */}

          <button
            class="btn btn-outline-primary mb-1"
            onClick={handleClickAddCookie}
          >
            Add Test Cookie
          </button>
          <button
            class="btn btn-outline-danger"
            onClick={handleRemoveAllCookies}
          >
            Remove Cookies
          </button>
        </div>
        <div class="footer">
          {!!message && <div class="mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
