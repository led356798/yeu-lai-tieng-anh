/*
 * =====================================================
 *  GOOGLE APPS SCRIPT - ĐĂNG KÝ THỬ THÁCH YÊU LẠI TIẾNG ANH
 * =====================================================
 *
 *  HƯỚNG DẪN CÀI ĐẶT:
 *
 *  Bước 1: Tạo Google Sheet mới
 *    - Vào https://sheets.google.com → tạo Sheet mới
 *    - Đặt tên: "Đăng ký Yêu Lại Tiếng Anh"
 *    - Ở dòng 1 (header), gõ các cột:
 *      A1: Ngày đăng ký
 *      B1: Họ tên
 *      C1: SĐT
 *      D1: Facebook
 *      E1: Mục tiêu học
 *      F1: Trình độ hiện tại
 *      G1: Biết từ đâu
 *      H1: Trạng thái
 *
 *  Bước 2: Mở Apps Script
 *    - Trong Google Sheet, vào menu: Extensions > Apps Script
 *    - Xóa hết code mặc định
 *    - Copy toàn bộ code bên dưới vào
 *    - Nhấn Ctrl+S để lưu
 *
 *  Bước 3: Deploy
 *    - Nhấn nút "Deploy" (góc trên phải) > "New deployment"
 *    - Type: chọn "Web app"
 *    - Description: "Đăng ký Yêu Lại Tiếng Anh"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Nhấn "Deploy"
 *    - Cho phép quyền truy cập (nhấn Review permissions > chọn tài khoản > Advanced > Go to... > Allow)
 *    - COPY URL web app (dạng: https://script.google.com/macros/s/xxx/exec)
 *
 *  Bước 4: Dán URL vào sales page
 *    - Mở file index.html
 *    - Tìm dòng: const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
 *    - Thay YOUR_GOOGLE_APPS_SCRIPT_URL bằng URL vừa copy
 *    - Lưu file, deploy lại
 *
 * =====================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString('vi-VN'),  // Ngày đăng ký
      data.hoTen || '',                     // Họ tên
      data.sdt || '',                       // SĐT
      data.facebook || '',                  // Facebook
      data.mucTieu || '',                   // Mục tiêu học
      data.trinhDo || '',                   // Trình độ hiện tại
      data.nguon || '',                     // Biết từ đâu
      'Chờ thanh toán'                        // Trạng thái
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Đăng ký thành công!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'API đang hoạt động' }))
    .setMimeType(ContentService.MimeType.JSON);
}
