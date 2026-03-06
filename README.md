# 💕 Website 8/3 — Dành Cho Em

Một website nhỏ xinh dành tặng người đặc biệt nhân ngày Quốc tế Phụ nữ 8/3.

## 🌸 Tính năng

- **Trang khóa**: Nhập mật khẩu để vào — tạo bất ngờ cho người nhận
- **Trang nhạc**: Phát playlist nhạc yêu thương với giao diện đĩa vinyl cute
- **Trang ảnh**: Album ảnh kỷ niệm dạng polaroid với lightbox
- **Trang thư**: Lá thư tình với hiệu ứng đánh máy và confetti trái tim

## 🎀 Cách sử dụng

### 1. Đổi mật khẩu
Mở file `js/lock.js`, tìm dòng:
```js
const SECRET_PASSWORD = "0803";
```
Thay `"0803"` thành mật khẩu bạn muốn.

Mở file `index.html`, tìm phần gợi ý mật khẩu và thay đổi cho phù hợp:
```html
<p class="lock-hint">💡 Gợi ý: <span>ngày đặc biệt của chúng mình</span></p>
```

### 2. Thêm nhạc
- Đặt file MP3 vào thư mục `assets/music/`
- Mở file `js/music.js`, chỉnh sửa mảng `playlist`:
```js
const playlist = [
    {
        title: "Tên bài hát",
        artist: "Tên ca sĩ",
        src: "assets/music/tenbaihat.mp3",
        message: "💕 Lý do chọn bài này..."
    },
    // Thêm bài tiếp theo...
];
```

### 3. Thêm ảnh
- Đặt ảnh vào thư mục `assets/images/`
- Mở file `js/gallery.js`, chỉnh sửa mảng `photos`:
```js
const photos = [
    {
        src: "assets/images/tenfile.jpg",
        caption: "Mô tả ảnh 💕",
        date: "08/03/2026"
    },
    // Thêm ảnh tiếp theo...
];
```

### 4. Sửa lá thư
Mở file `js/letter.js`, chỉnh sửa các biến:
```js
const LETTER_GREETING = "Gửi em yêu,";
const LETTER_CONTENT = `Nội dung thư của bạn ở đây...`;
const LETTER_SIGNATURE = "Yêu em nhiều,<br>💕 Tên của bạn";
```

## 🚀 Deploy lên GitHub Pages

1. Push code lên GitHub repository
2. Vào **Settings** → **Pages**
3. Source: chọn **Deploy from a branch**
4. Branch: chọn **main** → **/root**
5. Nhấn **Save** → đợi vài phút
6. Website sẽ có tại: `https://username.github.io/ten-repo/`

## 📁 Cấu trúc thư mục

```
├── index.html          ← Trang khóa (Lock Screen)
├── music.html          ← Trang phát nhạc
├── gallery.html        ← Trang hình ảnh
├── letter.html         ← Trang lá thư
├── css/
│   └── style.css       ← CSS chung
├── js/
│   ├── lock.js         ← Logic mật khẩu
│   ├── music.js        ← Music player
│   ├── gallery.js      ← Gallery + lightbox
│   └── letter.js       ← Hiệu ứng đánh máy
├── assets/
│   ├── images/         ← Ảnh cá nhân
│   ├── music/          ← File MP3
│   └── fonts/          ← Font chữ (nếu cần)
└── README.md
```

## 💖 Lưu ý

- Website chạy hoàn toàn **tĩnh** (HTML/CSS/JS), không cần server
- Mật khẩu mặc định: `0803` (ngày 8/3)
- Nén ảnh trước khi thêm (dùng [TinyPNG](https://tinypng.com/)) để load nhanh
- File MP3 nên dưới 10MB mỗi bài để GitHub Pages chấp nhận
- Test responsive trên điện thoại trước khi gửi

---

Made with 💕
