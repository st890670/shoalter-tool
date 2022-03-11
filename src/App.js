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

  async function addCookie() {
    try {
      await chrome.cookies.set({
        url: `${currentURL?.protocol}//${currentURL?.hostname}`,
        name: "test",
        value: "true",
      });
    } catch (error) {
      throw error;
    }
  }

  async function removeAllCookies() {
    try {
      const cookies = await chrome.cookies.getAll({
        domain: currentURL.hostname,
      });
      let pendingPromises = cookies.map(deleteCookie);
      await Promise.all(pendingPromises);
    } catch (error) {
      throw error;
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

  async function handleManipulateCookie() {
    try {
      await removeAllCookies();
      await addCookie();
      setMessage("success!");
    } catch (error) {
      setMessage("something wrong!");
    }
  }

  return (
    <div className="App">
      <div class="shoalter-tool">
        <div class="header">
          <h4>Shoalter Tool</h4>
          <div class="Author">author: Jason Jiang</div>
        </div>

        <div class="content">
          <button
            class="btn btn-outline-danger"
            onClick={handleManipulateCookie}
          >
            Remove Cookies and Add Test Cookie
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
