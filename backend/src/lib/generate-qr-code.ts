import qr from 'qrcode';

export async function generateQRCode(text: string) {
  try {
    // Generar el código QR
    const qrUrl = await qr.toDataURL(text, {
      width: 700,
    });
    const base64Data = qrUrl.replace(/^data:image\/png;base64,/, '');
    console.log('🚀 ~ generateQRCode ~ qrUrl:', qrUrl);

    return base64Data;
  } catch (error) {
    console.error('Error al generar el código QR:', error);
    return null;
  }
}
