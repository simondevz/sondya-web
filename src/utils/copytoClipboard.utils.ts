export function copyToClipboard(text: string) {
  // Create a temporary textarea element
  const textarea = document.createElement("textarea");

  // Set the value of the textarea to the text to be copied
  textarea.value = text;

  // Append the textarea to the document
  document.body.appendChild(textarea);

  // Select the text in the textarea
  textarea.select();

  // Execute the copy command
  document.execCommand("copy");

  // Remove the temporary textarea from the document
  document.body.removeChild(textarea);
}

export function shareOnTwitter(text: string, url: string) {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, "_blank", "width=550,height=350");
}

export function shareOnFacebook(text: string, url: string) {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}&quote=${encodeURIComponent(text)}`;
  window.open(facebookUrl, "_blank", "width=550,height=350");
}

export function shareOnWhatsApp(text: string, url: string) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${text} ${url}`
  )}`;
  window.open(whatsappUrl, "_blank", "width=550,height=350");
}
