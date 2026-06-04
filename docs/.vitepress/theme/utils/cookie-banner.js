function createCookieBanner() {
    if (document.cookie.includes('cookie_consent=true')) return
  
    const banner = document.createElement('div')
    banner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
        max-width: 480px;
        margin: auto;
        background: var(--vp-c-bg-soft);
        color: var(--vp-c-text-1);
        border: 1px solid var(--vp-c-divider);
        padding: 1rem;
        font-size: 14px;
        z-index: 9999;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      ">
        <p style="margin: 0 0 1rem 0;">
          This site uses cookies to enhance your experience.
          <a href="https://www.eclipse.org/legal/privacy/" target="_blank" rel="noopener" style="text-decoration: underline; color: var(--vp-c-brand-1);">Learn more</a>.
        </p>
        <div style="text-align: right;">
          <button id="accept-cookies" style="
            background-color: var(--vp-button-brand-hover-bg);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
          ">
            Accept
          </button>
        </div>
      </div>
    `
    document.body.appendChild(banner)
  
    document.getElementById('accept-cookies').addEventListener('click', () => {
      const expires = new Date()
      expires.setFullYear(expires.getFullYear() + 1)
      document.cookie = `cookie_consent=true; expires=${expires.toUTCString()}; path=/`
      banner.remove()
    })
  }
  
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', createCookieBanner)
  }
  