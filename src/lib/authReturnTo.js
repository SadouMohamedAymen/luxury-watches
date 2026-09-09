
// Safely resolve ?returnTo= to a same-origin path.
// If the value is invalid or unsafe, return "/".

export function safeReturnTo() {
  const raw = new URLSearchParams(window.location.search).get("returnTo");

  if (!raw) {
    return "/";
  }

  try {
    const url = new URL(raw, window.location.origin);

    // Only allow URLs from the current website.
    if (url.origin !== window.location.origin) {
      return "/";
    }

    const path = url.pathname + url.search;

    // Prevent open redirects such as:
    // //evil.com
    // /\evil.com
    // /.//evil.com
    if (
      !path.startsWith("/") ||
      path.startsWith("//") ||
      path.includes("\\")
    ) {
      return "/";
    }

    return path;
  } catch {
    return "/";
  }
}

