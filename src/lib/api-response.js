export async function readApiResponse(response) {
  const text = await response.text();

  if (!text.trim()) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      response.ok
        ? "The authentication service returned an invalid response."
        : `Request failed (${response.status}).`
    );
  }
}