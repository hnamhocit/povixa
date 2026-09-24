"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || message.length < 10) {
    return {
      status: "error",
      message: "Vui lòng điền họ tên, email và mô tả tối thiểu 10 ký tự.",
    };
  }

  // TODO: gửi email qua Resend / lưu DB / Telegram
  console.log("New contact:", { name, email, message });

  return { status: "success", message: "Cảm ơn bạn. povixa sẽ phản hồi sớm." };
}
