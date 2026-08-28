// Single source of truth for contact details. Never inline these in a
// component or a markdown file — see CLAUDE.md section 6.
//
// TODO: every value below is a placeholder. Replace before launch —
// see CLAUDE.md section 10 for the full list of inputs needed from the owner.

export const BUSINESS_NAME = 'Fathima Nursery Gardens';

// Digits only, country code first, no "+" — this is the format wa.me needs.
export const WHATSAPP_NUMBER = '910000000000'; // TODO: real WhatsApp number

// Human-readable form for display and for tel: links.
export const PHONE_DISPLAY = '+91 00000 00000'; // TODO: real landline/mobile

export const EMAIL = 'info@fathimanursery.com'; // TODO: confirm real business email

export const ADDRESS = 'TODO: address line, district, Kerala, India';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function telLink(): string {
  return `tel:${PHONE_DISPLAY.replace(/\s+/g, '')}`;
}
