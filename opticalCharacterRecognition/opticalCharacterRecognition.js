// https://www.codewars.com/kata/5ec9e176721b990029ebce83/train/javascript

class Image {
	constructor(w, h, data) {
		this.pixels = data.slice();
		this.width = w;
		this.height = h;
	}
}

let imageData = new Image(13, 18, [
	0xff, 0xff, 0xff, 0xc0, 0xad, 0xad, 0xad, 0xad, 0xaf, 0xe8, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xda, 0x2, 0x0, 0x0, 0x0, 0x0, 0x0, 0x3c, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0x28, 0x2e, 0xe, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0xdc, 0xff, 0x50, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0xdc, 0xff, 0x50, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0xdc, 0xff, 0x50, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0xdc, 0xff, 0x50, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0xdc, 0xff, 0x50, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xd3, 0x42, 0x0, 0x0, 0x3a, 0x44, 0x12, 0x0, 0xe, 0x81, 0xf3, 0xff,
	0xd9, 0xb, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x4f, 0xff,
	0xb0, 0x0, 0xb, 0x43, 0x43, 0x43, 0x43, 0x43, 0x43, 0x35, 0x0, 0xa, 0xf1,
	0xad, 0x0, 0x2b, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc8, 0x0, 0x0, 0xe8,
	0xad, 0x0, 0x2b, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc8, 0x0, 0x0, 0xe8,
	0xad, 0x0, 0x2b, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc8, 0x0, 0x0, 0xe8,
	0xad, 0x0, 0x2b, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc8, 0x0, 0x0, 0xe8,
	0xad, 0x0, 0x2b, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc8, 0x0, 0x0, 0xe8,
	0xb2, 0x0, 0x8, 0x32, 0x32, 0x32, 0x32, 0x32, 0x32, 0x28, 0x0, 0xe, 0xf5,
	0xe8, 0x1e, 0x15, 0x15, 0x15, 0x15, 0x15, 0x15, 0x15, 0x15, 0x15, 0x6b, 0xff
]);

imageData = new Image(205, 27, [250, 253, 254, 248, 247, 246, 240, 234, 238, 239, 239, 238, 240, 244, 245, 248, 252, 251, 252, 253, 254, 254, 254, 254, 255, 253, 252, 253, 255, 253, 254, 252, 254, 249, 243, 248, 247, 252, 254, 248, 251, 248, 246, 238, 233, 231, 237, 238, 234, 234, 242, 245, 243, 243, 240, 243, 242, 239, 240, 237, 243, 238, 241, 242, 241, 240, 238, 242, 239, 240, 241, 240, 238, 237, 238, 238, 242, 248, 246, 249, 245, 243, 245, 241, 237, 232, 233, 240, 239, 237, 242, 241, 237, 241, 236, 234, 235, 235, 231, 234, 233, 232, 235, 237, 240, 241, 243, 246, 243, 242, 240, 238, 238, 237, 235, 235, 239, 239, 238, 238, 235, 235, 235, 239, 242, 247, 250, 245, 241, 237, 231, 230, 238, 242, 239, 239, 237, 237, 236, 228, 227, 231, 233, 235, 240, 239, 239, 240, 243, 243, 248, 242, 243, 245, 247, 246, 246, 249, 246, 247, 244, 251, 252, 252, 252, 254, 251, 253, 253, 254, 252, 249, 253, 249, 247, 247, 242, 243, 237, 240, 242, 243, 241, 246, 246, 246, 247, 244, 246, 244, 244, 242, 248, 248, 245, 243, 240, 232, 233, 235, 242, 238, 240, 238, 239, 248, 251, 252, 247, 247, 246, 240, 232, 237, 238, 239, 238, 238, 242, 241, 246, 249, 248, 249, 250, 252, 253, 251, 254, 252, 249, 249, 253, 252, 252, 251, 253, 252, 254, 248, 254, 255, 250, 248, 253, 252, 253, 252, 244, 241, 238, 242, 243, 238, 239, 248, 250, 249, 247, 242, 246, 245, 242, 243, 241, 246, 240, 242, 243, 242, 242, 240, 245, 241, 243, 245, 242, 239, 238, 238, 238, 242, 248, 245, 248, 245, 243, 245, 240, 237, 233, 233, 242, 241, 238, 243, 243, 238, 242, 237, 235, 235, 235, 231, 235, 235, 233, 236, 238, 241, 242, 244, 247, 243, 242, 240, 237, 237, 237, 235, 236, 239, 239, 238, 238, 234, 233, 234, 238, 241, 245, 248, 244, 240, 235, 230, 230, 238, 242, 240, 240, 239, 240, 237, 227, 226, 231, 234, 235, 240, 239, 239, 240, 242, 243, 248, 241, 243, 245, 247, 246, 245, 248, 247, 248, 247, 253, 255, 254, 255, 252, 250, 252, 252, 253, 251, 251, 254, 251, 249, 250, 245, 245, 240, 241, 244, 244, 243, 249, 248, 247, 249, 246, 249, 248, 247, 245, 250, 250, 249, 246, 244, 237, 237, 238, 246, 242, 243, 241, 242, 250, 250, 251, 246, 247, 246, 241, 233, 237, 238, 239, 251, 224, 225, 232, 233, 236, 253, 249, 251, 253, 255, 253, 253, 254, 254, 253, 253, 254, 253, 254, 253, 255, 250, 245, 252, 255, 248, 245, 252, 252, 253, 250, 243, 240, 237, 240, 241, 236, 239, 248, 249, 247, 246, 241, 245, 244, 243, 243, 241, 245, 240, 241, 241, 240, 240, 238, 241, 239, 242, 242, 241, 238, 237, 237, 236, 242, 247, 244, 246, 243, 241, 243, 237, 234, 231, 232, 240, 240, 236, 242, 241, 237, 241, 236, 235, 235, 234, 230, 234, 233, 231, 234, 236, 239, 239, 240, 242, 239, 239, 236, 234, 233, 232, 230, 232, 234, 234, 232, 232, 228, 227, 228, 233, 236, 240, 243, 239, 234, 230, 226, 227, 234, 238, 236, 236, 237, 238, 235, 224, 223, 228, 229, 231, 236, 236, 235, 237, 240, 241, 245, 240, 242, 243, 244, 244, 243, 247, 245, 245, 243, 247, 248, 248, 248, 251, 253, 251, 250, 249, 251, 243, 246, 241, 241, 242, 238, 238, 234, 235, 238, 240, 239, 245, 246, 246, 248, 245, 247, 245, 245, 243, 248, 249, 248, 245, 245, 239, 237, 237, 245, 241, 243, 240, 240, 251, 252, 252, 247, 247, 247, 240, 232, 237, 239, 253, 68, 46, 42, 44, 38, 35, 47, 61, 87, 244, 252, 250, 252, 142, 103, 119, 185, 191, 197, 204, 207, 215, 239, 248, 253, 252, 245, 243, 249, 249, 254, 253, 246, 242, 239, 242, 245, 240, 241, 249, 249, 247, 245, 241, 244, 243, 243, 244, 243, 247, 242, 243, 243, 242, 241, 239, 242, 240, 244, 244, 242, 240, 240, 240, 240, 245, 250, 246, 247, 243, 242, 243, 237, 233, 229, 228, 237, 237, 232, 238, 237, 233, 237, 231, 230, 231, 230, 228, 232, 231, 230, 232, 233, 237, 237, 238, 241, 237, 238, 235, 232, 230, 229, 228, 229, 232, 232, 230, 229, 226, 225, 225, 229, 232, 235, 240, 236, 232, 227, 225, 225, 231, 234, 234, 231, 232, 234, 230, 219, 219, 225, 226, 227, 232, 230, 230, 231, 233, 234, 238, 234, 236, 238, 238, 239, 238, 242, 240, 241, 239, 242, 243, 243, 242, 245, 247, 246, 245, 244, 247, 239, 241, 237, 237, 238, 234, 235, 231, 232, 235, 237, 238, 243, 245, 243, 246, 243, 244, 241, 242, 240, 245, 245, 245, 243, 241, 235, 235, 235, 244, 239, 243, 242, 243, 253, 253, 253, 249, 248, 247, 240, 233, 239, 243, 203, 44, 52, 69, 64, 40, 31, 32, 34, 33, 114, 254, 252, 219, 31, 35, 34, 30, 31, 31, 34, 31, 33, 67, 250, 253, 249, 92, 74, 74, 80, 79, 82, 81, 82, 122, 227, 242, 237, 238, 228, 193, 195, 198, 200, 207, 212, 216, 235, 239, 244, 238, 240, 240, 238, 238, 235, 240, 234, 238, 237, 236, 234, 234, 236, 235, 240, 246, 242, 242, 240, 238, 239, 234, 231, 227, 227, 236, 235, 232, 236, 235, 231, 234, 229, 227, 228, 226, 224, 227, 228, 228, 229, 231, 236, 237, 237, 240, 238, 239, 236, 233, 233, 231, 230, 230, 233, 234, 232, 231, 227, 225, 225, 226, 230, 234, 238, 234, 230, 225, 223, 224, 230, 233, 233, 231, 232, 232, 230, 219, 219, 224, 226, 228, 233, 231, 231, 233, 233, 234, 238, 233, 235, 236, 237, 236, 235, 239, 237, 239, 238, 239, 239, 238, 238, 240, 241, 240, 239, 237, 239, 232, 234, 230, 231, 231, 227, 227, 224, 225, 228, 231, 231, 236, 238, 238, 241, 238, 239, 236, 236, 234, 240, 240, 239, 236, 236, 231, 231, 232, 240, 236, 239, 238, 239, 252, 252, 253, 249, 248, 248, 241, 235, 241, 244, 199, 42, 107, 249, 248, 241, 227, 221, 174, 29, 82, 251, 253, 210, 29, 46, 98, 89, 84, 78, 77, 62, 33, 54, 251, 251, 243, 57, 44, 40, 41, 34, 31, 24, 18, 15, 67, 242, 236, 239, 66, 22, 19, 17, 14, 17, 17, 15, 30, 46, 220, 238, 240, 227, 106, 67, 69, 79, 78, 88, 158, 171, 210, 236, 236, 236, 236, 210, 207, 210, 212, 215, 231, 234, 231, 228, 228, 237, 237, 233, 238, 235, 231, 234, 228, 225, 226, 224, 222, 225, 225, 225, 226, 229, 234, 235, 236, 241, 238, 238, 235, 233, 232, 231, 231, 232, 235, 235, 232, 231, 227, 224, 225, 227, 229, 234, 239, 235, 232, 227, 225, 226, 231, 235, 235, 232, 232, 232, 230, 220, 221, 225, 225, 227, 233, 230, 229, 230, 229, 228, 233, 228, 232, 233, 233, 233, 233, 238, 234, 237, 234, 236, 237, 236, 236, 239, 240, 239, 238, 237, 238, 231, 233, 230, 230, 231, 226, 227, 224, 224, 228, 231, 231, 236, 240, 239, 243, 240, 239, 238, 239, 237, 241, 241, 241, 238, 238, 232, 232, 233, 240, 236, 238, 238, 238, 251, 251, 251, 248, 245, 245, 238, 233, 240, 243, 200, 44, 109, 248, 246, 253, 254, 254, 205, 31, 85, 254, 253, 212, 32, 79, 249, 254, 252, 252, 247, 227, 34, 58, 255, 247, 247, 248, 232, 224, 219, 207, 198, 187, 175, 29, 20, 220, 238, 242, 59, 22, 50, 51, 43, 40, 22, 17, 17, 16, 198, 240, 241, 97, 14, 12, 10, 16, 10, 16, 14, 14, 26, 216, 236, 235, 115, 21, 16, 16, 13, 12, 26, 33, 34, 84, 221, 237, 238, 217, 72, 67, 182, 233, 227, 224, 225, 223, 221, 225, 226, 224, 226, 190, 191, 197, 201, 209, 210, 212, 212, 220, 230, 229, 229, 232, 236, 236, 233, 232, 227, 224, 225, 226, 229, 233, 238, 234, 233, 227, 226, 226, 232, 235, 236, 233, 233, 233, 230, 220, 221, 225, 225, 228, 233, 229, 229, 231, 229, 228, 232, 228, 231, 231, 233, 232, 233, 238, 234, 236, 234, 236, 236, 234, 234, 237, 239, 237, 235, 236, 235, 228, 229, 227, 228, 230, 224, 225, 223, 222, 227, 229, 229, 234, 237, 237, 242, 240, 240, 238, 239, 237, 240, 241, 241, 238, 238, 233, 232, 233, 240, 237, 237, 236, 237, 251, 250, 250, 245, 242, 242, 234, 229, 237, 239, 203, 47, 111, 244, 244, 250, 253, 255, 205, 31, 86, 254, 252, 211, 34, 85, 249, 252, 250, 250, 245, 225, 35, 60, 254, 245, 245, 237, 237, 242, 242, 248, 252, 253, 237, 26, 20, 222, 238, 240, 53, 21, 211, 240, 238, 240, 223, 213, 50, 14, 196, 238, 240, 55, 13, 143, 167, 168, 92, 86, 80, 28, 13, 183, 237, 236, 157, 55, 46, 42, 35, 14, 14, 10, 5, 3, 157, 235, 235, 166, 10, 8, 81, 231, 224, 220, 221, 219, 217, 221, 222, 221, 177, 2, 6, 7, 7, 11, 8, 9, 7, 12, 59, 225, 226, 215, 52, 43, 44, 45, 42, 43, 47, 51, 81, 215, 236, 233, 233, 228, 228, 168, 162, 168, 172, 172, 174, 176, 182, 220, 224, 227, 208, 187, 194, 192, 194, 198, 199, 202, 212, 232, 235, 235, 236, 235, 234, 239, 235, 237, 235, 236, 235, 234, 234, 237, 238, 237, 236, 237, 235, 228, 229, 226, 226, 227, 222, 224, 221, 220, 224, 227, 227, 232, 235, 234, 239, 235, 236, 234, 236, 235, 236, 237, 237, 234, 235, 230, 228, 230, 236, 232, 233, 231, 234, 252, 252, 252, 253, 249, 250, 242, 238, 244, 246, 195, 39, 104, 251, 249, 255, 253, 251, 201, 27, 81, 250, 253, 203, 30, 74, 222, 225, 231, 248, 250, 217, 30, 56, 251, 250, 250, 240, 240, 243, 243, 249, 253, 251, 225, 17, 23, 229, 236, 239, 48, 20, 212, 239, 236, 236, 238, 237, 51, 13, 196, 235, 237, 51, 9, 193, 231, 238, 233, 240, 238, 67, 11, 180, 235, 233, 238, 243, 239, 240, 236, 216, 210, 202, 64, 1, 130, 232, 231, 162, 8, 60, 212, 229, 222, 219, 221, 218, 217, 220, 221, 219, 163, 0, 17, 44, 40, 41, 34, 31, 20, 6, 47, 226, 226, 197, 16, 10, 8, 6, 0, 4, 3, 2, 1, 59, 237, 234, 234, 230, 229, 54, 9, 14, 14, 11, 12, 10, 9, 175, 225, 229, 40, 9, 13, 8, 8, 9, 9, 9, 16, 102, 236, 235, 237, 123, 31, 37, 36, 40, 39, 43, 45, 46, 51, 209, 242, 240, 230, 106, 58, 53, 55, 54, 54, 57, 54, 130, 223, 221, 225, 212, 73, 67, 71, 71, 78, 75, 77, 76, 81, 209, 237, 238, 239, 236, 237, 233, 232, 234, 240, 236, 236, 234, 236, 255, 255, 254, 250, 248, 249, 240, 237, 242, 245, 197, 39, 103, 253, 252, 251, 248, 246, 197, 25, 78, 247, 249, 197, 26, 30, 30, 28, 29, 42, 58, 53, 28, 52, 247, 255, 253, 243, 243, 246, 246, 251, 255, 250, 220, 15, 39, 241, 237, 240, 43, 20, 217, 240, 238, 238, 240, 240, 49, 14, 197, 235, 235, 49, 8, 193, 231, 237, 231, 239, 238, 67, 13, 184, 237, 236, 240, 244, 240, 239, 235, 237, 235, 230, 69, 2, 152, 229, 229, 157, 5, 74, 222, 225, 219, 217, 219, 216, 215, 218, 219, 217, 205, 66, 180, 231, 230, 234, 230, 229, 173, 4, 50, 223, 223, 225, 203, 194, 190, 185, 176, 169, 168, 141, 1, 35, 235, 232, 231, 228, 227, 47, 7, 66, 77, 72, 71, 68, 83, 213, 225, 230, 98, 52, 53, 48, 45, 43, 42, 41, 16, 10, 203, 235, 236, 60, 13, 16, 12, 15, 13, 15, 15, 13, 13, 183, 243, 242, 110, 17, 14, 9, 10, 7, 8, 9, 3, 5, 181, 226, 230, 161, 6, 10, 14, 11, 18, 13, 12, 11, 13, 78, 239, 240, 242, 238, 240, 236, 235, 237, 243, 239, 241, 238, 239, 249, 248, 249, 255, 250, 251, 242, 240, 244, 245, 197, 39, 104, 253, 253, 251, 248, 247, 199, 26, 79, 246, 248, 229, 67, 60, 55, 39, 28, 30, 32, 28, 27, 54, 248, 254, 253, 244, 242, 247, 245, 251, 255, 250, 218, 17, 44, 243, 237, 236, 36, 21, 44, 49, 52, 57, 64, 69, 24, 16, 199, 236, 237, 50, 9, 196, 232, 238, 233, 239, 239, 67, 13, 185, 237, 237, 241, 246, 241, 239, 234, 236, 234, 228, 64, 2, 156, 230, 229, 157, 5, 96, 222, 225, 219, 217, 219, 218, 217, 220, 220, 218, 220, 224, 230, 232, 231, 233, 231, 229, 169, 3, 55, 221, 222, 225, 228, 229, 228, 225, 220, 216, 217, 182, 3, 37, 233, 231, 229, 226, 226, 41, 6, 193, 233, 231, 232, 231, 231, 223, 222, 226, 226, 230, 233, 229, 230, 231, 232, 232, 41, 6, 197, 232, 231, 49, 8, 176, 208, 210, 208, 206, 204, 54, 10, 183, 241, 242, 66, 19, 157, 188, 189, 186, 183, 183, 53, 6, 169, 227, 232, 85, 8, 121, 176, 173, 178, 171, 170, 115, 12, 80, 239, 239, 241, 236, 238, 234, 234, 238, 244, 239, 240, 236, 237, 250, 251, 251, 252, 248, 248, 240, 238, 243, 244, 199, 43, 108, 250, 249, 254, 253, 251, 204, 31, 83, 248, 250, 248, 251, 253, 254, 243, 229, 226, 222, 177, 29, 56, 251, 251, 251, 196, 94, 91, 97, 97, 99, 98, 112, 20, 50, 245, 240, 240, 62, 25, 23, 22, 20, 17, 18, 18, 17, 17, 201, 237, 238, 49, 8, 196, 231, 237, 233, 240, 239, 66, 14, 186, 237, 237, 242, 246, 241, 237, 232, 234, 232, 226, 58, 3, 160, 230, 229, 157, 7, 157, 226, 230, 223, 221, 223, 221, 220, 222, 221, 218, 220, 223, 229, 230, 229, 230, 228, 225, 161, 0, 57, 219, 220, 222, 225, 226, 224, 222, 215, 213, 214, 174, 7, 38, 229, 226, 224, 221, 220, 31, 1, 194, 228, 227, 230, 227, 227, 219, 220, 223, 224, 228, 231, 227, 229, 229, 231, 232, 37, 7, 203, 232, 233, 46, 10, 204, 236, 239, 239, 239, 240, 59, 12, 188, 242, 243, 64, 21, 195, 235, 237, 235, 235, 236, 64, 7, 173, 229, 233, 75, 11, 174, 239, 237, 242, 236, 237, 111, 13, 84, 240, 239, 240, 235, 238, 234, 233, 236, 241, 237, 238, 235, 236, 252, 252, 251, 253, 248, 248, 240, 237, 242, 243, 199, 44, 109, 248, 248, 254, 254, 253, 206, 33, 84, 250, 250, 249, 253, 253, 254, 253, 254, 254, 254, 210, 30, 58, 253, 248, 237, 53, 46, 43, 46, 41, 36, 32, 29, 23, 91, 249, 243, 245, 241, 220, 213, 207, 199, 191, 186, 181, 32, 14, 199, 234, 236, 46, 5, 194, 228, 235, 231, 239, 238, 65, 12, 185, 235, 234, 238, 243, 232, 205, 203, 209, 228, 213, 35, 7, 163, 225, 225, 153, 5, 158, 224, 228, 221, 219, 220, 220, 218, 220, 219, 217, 217, 221, 227, 228, 226, 228, 226, 224, 135, 1, 62, 218, 220, 222, 225, 227, 225, 223, 217, 215, 217, 172, 5, 43, 232, 227, 225, 222, 221, 28, 1, 198, 229, 228, 230, 228, 229, 222, 222, 226, 227, 230, 234, 230, 231, 234, 236, 237, 36, 11, 211, 235, 236, 44, 13, 212, 239, 240, 239, 240, 241, 55, 13, 192, 242, 243, 62, 19, 195, 234, 235, 232, 232, 234, 58, 6, 177, 228, 232, 68, 11, 179, 238, 237, 240, 235, 235, 78, 12, 97, 240, 239, 241, 235, 237, 234, 233, 236, 241, 237, 237, 234, 235, 252, 251, 250, 255, 251, 252, 244, 242, 246, 246, 197, 41, 106, 251, 250, 255, 254, 253, 205, 32, 82, 249, 250, 248, 251, 254, 255, 251, 252, 254, 255, 212, 29, 58, 251, 250, 215, 42, 75, 205, 204, 194, 174, 101, 94, 128, 238, 248, 242, 245, 250, 253, 250, 249, 245, 242, 243, 243, 44, 17, 202, 237, 239, 48, 7, 197, 229, 235, 231, 239, 239, 63, 11, 186, 234, 232, 238, 242, 92, 8, 3, 6, 26, 16, 4, 11, 204, 226, 226, 152, 4, 160, 222, 227, 220, 218, 220, 218, 217, 221, 220, 219, 218, 220, 224, 226, 224, 226, 224, 133, 6, 2, 105, 217, 218, 219, 222, 223, 221, 220, 216, 214, 217, 169, 4, 50, 233, 228, 225, 223, 222, 25, 3, 204, 229, 229, 230, 229, 230, 222, 222, 227, 227, 230, 234, 232, 234, 236, 237, 218, 16, 17, 221, 235, 236, 38, 12, 50, 53, 56, 57, 61, 64, 23, 13, 195, 243, 243, 59, 21, 202, 237, 238, 235, 234, 235, 56, 7, 180, 229, 232, 62, 10, 68, 86, 86, 120, 160, 161, 55, 11, 164, 238, 237, 238, 233, 235, 231, 230, 233, 240, 236, 236, 233, 234, 252, 251, 251, 254, 252, 252, 245, 242, 247, 247, 198, 41, 105, 252, 250, 255, 254, 253, 204, 32, 84, 252, 254, 251, 254, 253, 253, 252, 253, 254, 253, 214, 31, 60, 254, 246, 223, 47, 88, 242, 238, 243, 247, 251, 253, 251, 255, 252, 246, 249, 254, 253, 254, 254, 250, 248, 249, 249, 49, 20, 207, 242, 242, 51, 10, 202, 233, 240, 236, 244, 245, 68, 15, 190, 237, 234, 240, 244, 121, 34, 24, 10, 4, 0, 5, 33, 214, 227, 227, 121, 3, 164, 223, 226, 220, 218, 220, 219, 219, 223, 222, 221, 220, 222, 227, 229, 228, 222, 97, 0, 1, 94, 215, 219, 220, 216, 92, 34, 33, 35, 34, 36, 41, 37, 4, 63, 239, 234, 234, 231, 231, 28, 10, 75, 98, 163, 166, 175, 227, 228, 228, 232, 223, 183, 183, 182, 183, 187, 191, 172, 14, 36, 237, 237, 237, 49, 15, 19, 17, 19, 18, 20, 20, 18, 17, 201, 246, 246, 60, 24, 207, 240, 240, 238, 238, 238, 57, 10, 188, 233, 237, 64, 16, 19, 20, 19, 24, 16, 15, 15, 17, 173, 243, 241, 242, 238, 241, 236, 234, 237, 245, 242, 240, 237, 237, 248, 247, 247, 251, 254, 255, 248, 245, 249, 251, 196, 37, 101, 254, 254, 252, 250, 249, 200, 28, 80, 247, 249, 247, 250, 254, 255, 249, 251, 253, 254, 214, 29, 59, 252, 248, 224, 44, 83, 245, 242, 246, 249, 253, 254, 248, 251, 247, 242, 246, 250, 253, 251, 251, 248, 245, 246, 246, 47, 19, 207, 241, 243, 50, 13, 205, 234, 240, 237, 245, 245, 65, 17, 194, 240, 236, 244, 247, 240, 236, 232, 218, 209, 194, 22, 2, 179, 231, 230, 77, 5, 22, 31, 38, 35, 35, 40, 44, 52, 208, 224, 224, 222, 222, 226, 228, 212, 59, 1, 5, 126, 222, 221, 217, 218, 162, 0, 4, 4, 3, 0, 1, 2, 6, 16, 176, 241, 238, 238, 236, 219, 15, 14, 17, 18, 16, 15, 15, 88, 233, 232, 230, 65, 17, 19, 16, 16, 17, 18, 17, 18, 60, 242, 242, 243, 234, 210, 212, 207, 206, 205, 204, 203, 42, 22, 209, 251, 252, 62, 30, 217, 246, 246, 245, 244, 244, 60, 16, 197, 242, 246, 217, 178, 178, 179, 179, 182, 172, 119, 35, 21, 181, 248, 247, 250, 247, 248, 245, 243, 246, 252, 248, 247, 243, 243, 251, 250, 249, 254, 253, 252, 245, 242, 246, 249, 199, 41, 104, 254, 252, 254, 252, 251, 202, 30, 80, 248, 250, 248, 251, 254, 253, 253, 255, 253, 249, 220, 36, 66, 252, 242, 232, 48, 85, 242, 239, 244, 247, 250, 254, 251, 254, 250, 245, 249, 253, 254, 253, 253, 250, 249, 250, 250, 53, 21, 209, 242, 244, 52, 14, 208, 237, 243, 240, 248, 247, 67, 19, 196, 241, 236, 242, 247, 242, 236, 233, 235, 235, 231, 53, 0, 168, 232, 230, 76, 5, 5, 3, 7, 0, 2, 2, 1, 1, 162, 228, 228, 225, 225, 231, 232, 92, 8, 19, 168, 226, 227, 226, 222, 223, 156, 3, 64, 197, 194, 189, 184, 184, 187, 208, 237, 245, 240, 240, 237, 229, 172, 172, 173, 172, 101, 89, 27, 26, 223, 235, 200, 16, 30, 76, 70, 69, 69, 67, 65, 82, 224, 245, 244, 244, 248, 248, 250, 249, 247, 247, 249, 250, 47, 23, 213, 253, 255, 61, 31, 222, 249, 250, 248, 248, 249, 62, 21, 205, 246, 249, 250, 251, 253, 254, 253, 253, 249, 249, 72, 26, 189, 253, 252, 254, 254, 255, 251, 248, 250, 254, 252, 251, 247, 249, 250, 249, 248, 253, 253, 251, 246, 242, 245, 248, 210, 43, 52, 67, 74, 75, 79, 84, 78, 29, 80, 248, 251, 247, 251, 254, 253, 252, 255, 253, 251, 218, 35, 65, 251, 241, 237, 50, 84, 241, 238, 244, 246, 249, 252, 252, 253, 249, 244, 249, 253, 253, 255, 255, 253, 252, 253, 253, 57, 22, 210, 242, 244, 51, 15, 210, 238, 244, 240, 247, 246, 64, 18, 196, 241, 236, 243, 247, 243, 238, 235, 237, 236, 232, 56, 1, 167, 233, 231, 76, 5, 146, 191, 191, 181, 176, 173, 49, 0, 158, 227, 228, 225, 224, 229, 231, 72, 7, 151, 225, 224, 226, 226, 223, 224, 158, 4, 74, 231, 230, 228, 225, 228, 232, 230, 233, 242, 237, 237, 233, 234, 234, 237, 240, 242, 240, 241, 37, 18, 215, 233, 197, 15, 61, 246, 241, 242, 243, 243, 244, 244, 244, 245, 244, 245, 248, 249, 251, 248, 248, 249, 252, 252, 46, 24, 216, 253, 253, 57, 31, 224, 247, 250, 248, 248, 249, 60, 22, 209, 247, 250, 251, 253, 254, 252, 254, 251, 251, 251, 72, 28, 193, 254, 253, 253, 254, 254, 249, 246, 248, 254, 250, 249, 245, 246, 248, 246, 245, 249, 254, 254, 250, 246, 249, 252, 255, 106, 38, 31, 32, 28, 26, 25, 27, 25, 141, 245, 248, 244, 249, 254, 254, 252, 254, 255, 246, 56, 34, 66, 252, 241, 240, 50, 60, 106, 112, 112, 152, 192, 195, 194, 221, 250, 245, 249, 253, 253, 255, 254, 252, 252, 253, 253, 59, 23, 212, 243, 246, 51, 16, 211, 239, 244, 239, 248, 248, 64, 20, 200, 244, 239, 247, 250, 247, 243, 240, 242, 241, 237, 63, 5, 172, 239, 240, 83, 14, 177, 236, 240, 232, 230, 231, 72, 9, 165, 234, 234, 232, 231, 236, 238, 81, 15, 164, 231, 231, 233, 232, 229, 230, 165, 9, 80, 236, 237, 233, 230, 233, 237, 235, 240, 249, 244, 242, 238, 239, 238, 242, 244, 245, 243, 244, 40, 22, 219, 237, 201, 17, 62, 247, 242, 242, 245, 245, 245, 244, 244, 247, 245, 245, 248, 248, 251, 249, 248, 248, 250, 251, 42, 22, 217, 249, 250, 51, 26, 222, 242, 245, 242, 243, 244, 53, 18, 208, 243, 246, 247, 249, 252, 254, 252, 254, 246, 247, 66, 22, 191, 247, 247, 250, 247, 248, 243, 241, 242, 246, 243, 244, 239, 240, 246, 246, 244, 249, 254, 255, 251, 247, 250, 252, 247, 248, 231, 216, 212, 203, 194, 187, 185, 194, 243, 246, 250, 246, 251, 253, 251, 254, 253, 252, 252, 67, 39, 88, 247, 237, 247, 53, 53, 49, 51, 46, 43, 42, 40, 36, 49, 242, 248, 251, 254, 250, 251, 251, 253, 252, 252, 124, 37, 28, 218, 251, 252, 59, 22, 81, 92, 142, 175, 186, 190, 56, 22, 205, 247, 241, 241, 220, 220, 221, 221, 232, 247, 243, 68, 9, 175, 243, 244, 86, 18, 180, 240, 244, 235, 234, 235, 76, 12, 167, 238, 238, 235, 234, 240, 242, 86, 19, 166, 233, 233, 234, 234, 231, 231, 167, 10, 80, 239, 240, 236, 232, 235, 241, 240, 245, 253, 246, 245, 239, 241, 240, 244, 245, 245, 243, 244, 42, 22, 220, 238, 204, 18, 64, 247, 243, 244, 247, 247, 247, 249, 249, 250, 248, 250, 253, 251, 255, 252, 252, 253, 254, 253, 46, 27, 226, 255, 254, 53, 31, 228, 246, 249, 245, 246, 247, 52, 21, 215, 247, 249, 250, 252, 254, 254, 254, 255, 247, 247, 64, 23, 195, 248, 247, 249, 246, 247, 242, 240, 240, 246, 242, 242, 237, 238, 243, 243, 242, 246, 252, 253, 254, 250, 252, 255, 250, 250, 250, 252, 254, 251, 247, 246, 249, 248, 243, 243, 246, 243, 247, 252, 255, 252, 254, 255, 252, 248, 232, 252, 251, 241, 247, 219, 214, 205, 201, 167, 109, 101, 95, 86, 127, 247, 243, 247, 252, 255, 254, 254, 253, 255, 254, 93, 29, 33, 223, 248, 251, 131, 22, 23, 20, 23, 19, 26, 26, 22, 30, 222, 245, 240, 101, 29, 27, 25, 21, 28, 45, 46, 23, 12, 181, 245, 244, 84, 18, 56, 72, 78, 71, 73, 78, 23, 10, 164, 236, 236, 234, 233, 239, 240, 86, 16, 160, 232, 233, 235, 235, 233, 233, 171, 13, 83, 242, 243, 240, 235, 238, 244, 243, 248, 254, 250, 249, 130, 153, 232, 248, 250, 250, 249, 250, 48, 29, 226, 243, 211, 23, 69, 253, 249, 251, 253, 252, 252, 254, 254, 254, 252, 255, 254, 254, 250, 253, 252, 252, 250, 249, 49, 29, 232, 251, 253, 52, 41, 239, 251, 253, 250, 251, 252, 55, 27, 224, 253, 254, 254, 254, 252, 250, 251, 251, 250, 251, 66, 24, 201, 249, 249, 250, 247, 247, 242, 241, 241, 245, 241, 241, 236, 238, 245, 245, 244, 248, 253, 254, 252, 249, 251, 254, 250, 248, 249, 253, 253, 253, 249, 249, 253, 252, 247, 248, 250, 247, 250, 255, 253, 254, 254, 254, 249, 254, 251, 250, 253, 242, 241, 238, 237, 241, 240, 246, 249, 251, 252, 254, 254, 246, 244, 248, 254, 253, 254, 253, 255, 254, 254, 247, 217, 218, 248, 248, 253, 249, 196, 179, 162, 96, 89, 91, 89, 85, 190, 249, 249, 244, 161, 68, 62, 55, 48, 34, 26, 22, 16, 64, 227, 244, 245, 123, 17, 17, 17, 19, 9, 9, 9, 8, 11, 151, 237, 237, 235, 233, 239, 243, 101, 18, 90, 233, 234, 236, 236, 234, 235, 176, 17, 30, 44, 47, 47, 46, 51, 58, 62, 161, 250, 254, 234, 29, 23, 36, 78, 85, 86, 87, 90, 37, 36, 233, 245, 212, 25, 59, 183, 181, 183, 186, 188, 191, 195, 224, 255, 253, 255, 253, 254, 250, 251, 251, 251, 249, 223, 34, 30, 235, 251, 239, 35, 55, 221, 218, 222, 220, 220, 222, 47, 25, 226, 253, 255, 254, 251, 248, 246, 246, 246, 253, 250, 62, 26, 204, 250, 250, 250, 247, 248, 243, 243, 243, 247, 244, 244, 237, 239, 245, 244, 244, 248, 252, 253, 253, 250, 252, 254, 250, 246, 246, 254, 250, 254, 253, 251, 254, 254, 251, 252, 252, 248, 252, 254, 251, 254, 254, 254, 250, 254, 253, 253, 254, 245, 245, 242, 239, 242, 241, 245, 249, 251, 252, 254, 255, 248, 246, 251, 254, 252, 252, 250, 252, 252, 252, 251, 253, 251, 251, 249, 255, 255, 250, 251, 249, 251, 247, 253, 255, 253, 252, 252, 252, 246, 253, 252, 253, 253, 251, 241, 228, 220, 212, 235, 239, 246, 247, 237, 194, 187, 184, 183, 170, 166, 163, 158, 109, 226, 240, 240, 237, 235, 239, 244, 215, 71, 202, 236, 236, 237, 237, 236, 237, 187, 42, 42, 24, 26, 24, 21, 24, 28, 28, 108, 246, 252, 255, 198, 75, 30, 28, 30, 29, 28, 30, 31, 103, 248, 246, 214, 26, 31, 32, 28, 28, 30, 29, 29, 32, 66, 255, 252, 254, 255, 254, 253, 255, 254, 253, 251, 65, 30, 31, 239, 251, 255, 63, 38, 32, 29, 32, 29, 29, 31, 26, 45, 245, 254, 252, 252, 251, 247, 246, 247, 247, 254, 104, 25, 26, 208, 251, 249, 247, 246, 246, 243, 242, 243, 246, 243, 243, 236, 236, 246, 245, 245, 249, 254, 253, 255, 253, 254, 253, 253, 250, 250, 253, 253, 254, 252, 250, 254, 254, 252, 252, 252, 248, 253, 251, 249, 253, 252, 252, 250, 255, 253, 252, 254, 246, 247, 244, 241, 246, 246, 249, 253, 254, 254, 252, 253, 245, 244, 248, 254, 255, 255, 252, 254, 255, 255, 254, 255, 249, 249, 247, 253, 253, 248, 248, 246, 248, 244, 249, 250, 248, 247, 248, 248, 241, 248, 254, 253, 250, 248, 248, 249, 244, 239, 238, 239, 245, 248, 245, 245, 244, 243, 244, 234, 233, 233, 231, 236, 243, 241, 241, 237, 235, 239, 242, 243, 241, 236, 234, 235, 236, 235, 235, 236, 239, 245, 247, 229, 225, 221, 215, 217, 219, 218, 247, 248, 254, 255, 250, 253, 223, 205, 203, 200, 198, 198, 204, 253, 255, 252, 243, 183, 186, 117, 104, 103, 103, 100, 100, 101, 171, 249, 252, 251, 250, 251, 248, 249, 248, 248, 246, 148, 85, 130, 246, 245, 244, 219, 92, 77, 73, 74, 71, 70, 72, 71, 185, 249, 247, 246, 248, 247, 245, 243, 246, 244, 253, 132, 56, 66, 235, 251, 250, 248, 246, 246, 243, 241, 242, 245, 241, 242, 234, 235, 249, 248, 247, 251, 255, 254, 254, 253, 254, 253, 252, 249, 250, 254, 250, 253, 255, 253, 253, 253, 253, 252, 250, 247, 251, 252, 250, 254, 253, 254, 250, 255, 253, 252, 254, 246, 246, 244, 240, 245, 244, 248, 253, 254, 254, 250, 252, 245, 243, 247, 254, 254, 254, 251, 254, 255, 254, 253, 254, 249, 250, 248, 252, 253, 249, 250, 246, 247, 243, 248, 249, 247, 246, 248, 246, 240, 248, 252, 250, 247, 246, 245, 246, 242, 237, 236, 237, 242, 245, 243, 242, 242, 243, 245, 233, 234, 233, 232, 238, 244, 242, 242, 238, 237, 244, 247, 248, 247, 242, 239, 239, 241, 242, 241, 242, 245, 249, 254, 255, 255, 254, 251, 255, 250, 251, 247, 241, 246, 247, 250, 248, 247, 245, 245, 247, 248, 246, 245, 244, 251, 253, 249, 249, 245, 244, 249, 249, 246, 248, 249, 246, 247, 247, 250, 249, 249, 251, 245, 248, 248, 248, 246, 245, 250, 250, 247, 246, 244, 243, 240, 247, 250, 248, 250, 249, 246, 251, 250, 246, 244, 243, 244, 244, 242, 240, 243, 241, 250, 252, 253, 255, 254, 255, 253, 251, 249, 250, 249, 247, 248, 252, 248, 248, 241, 240, 252, 251, 250, 255, 250, 253, 251, 250, 251, 252, 247, 245, 246, 250, 244, 248, 249, 251, 247, 247, 251, 254, 255, 250, 253, 251, 250, 254, 253, 254, 249, 253, 252, 252, 253, 247, 247, 245, 243, 247, 247, 251, 254, 251, 252, 248, 249, 242, 239, 244, 251, 253, 253, 252, 254, 252, 253, 253, 253, 247, 248, 245, 249, 251, 246, 248, 244, 243, 241, 246, 247, 246, 245, 246, 244, 238, 245, 249, 248, 246, 244, 243, 245, 241, 237, 236, 235, 240, 243, 242, 242, 241, 243, 244, 233, 234, 234, 232, 238, 242, 241, 241, 238, 236, 241, 244, 246, 245, 239, 237, 236, 239, 240, 238, 237, 241, 245, 252, 250, 250, 250, 247, 251, 254, 254, 253, 247, 251, 250, 254, 252, 250, 248, 247, 248, 249, 246, 245, 244, 249, 251, 246, 246, 242, 243, 246, 246, 243, 247, 248, 244, 245, 244, 248, 247, 248, 250, 245, 247, 245, 246, 243, 243, 248, 248, 245, 244, 242, 242, 238, 246, 248, 245, 248, 248, 245, 250, 248, 244, 242, 242, 243, 241, 239, 238, 241, 238, 247, 249, 254, 253, 255, 254, 255, 254, 252, 255, 254, 253, 254, 252, 254, 253, 245, 246, 251, 250, 248, 252, 253, 254, 254, 255, 254, 253, 252, 249, 249, 254, 249, 252, 254, 255, 253, 252, 253, 252, 249, 245, 248, 254, 254, 250, 251, 251, 254, 252, 254, 254, 249, 251, 252, 251, 248, 253, 254, 252, 247, 244, 245, 242, 244, 236, 234, 239, 247, 249, 249, 254, 248, 247, 249, 250, 249, 242, 242, 239, 244, 246, 242, 243, 240, 240, 238, 242, 244, 242, 241, 242, 240, 237, 245, 248, 248, 246, 244, 244, 244, 240, 236, 237, 237, 242, 244, 242, 242, 240, 241, 243, 231, 231, 231, 230, 236, 240, 238, 238, 235, 233, 238, 241, 244, 244, 237, 235, 236, 236, 238, 237, 236, 239, 243, 250, 248, 248, 247, 244, 248, 251, 251, 254, 250, 253, 253, 253, 255, 253, 250, 250, 252, 251, 248, 246, 244, 248, 250, 245, 247, 243, 243, 246, 246, 243, 246, 248, 245, 247, 245, 248, 248, 248, 249, 244, 246, 245, 244, 243, 242, 248, 248, 245, 243, 240, 238, 235, 243, 245, 242, 243, 245, 241, 246, 244, 240, 237, 236, 237, 236, 236, 235, 237, 234, 242, 244, 248, 248, 249, 247, 248, 249, 251, 250, 251, 253, 252, 247, 252, 254, 248, 249])

const template = [{
		y: 2,
		x1: 2,
		x1L: 1,
		x1R: 1,
		x2: 2,
		x2L: 1,
		x2R: 1,
	},
	{
		y: 1,
		x1: 1,
		x1L: 0,
		x1R: 1,
		x2: 2,
		x2L: 0,
		x2R: 2,
	},
	{
		y: 3,
		x1: 1,
		x1L: 0,
		x1R: 1,
		x2: 1,
		x2L: 1,
		x2R: 0,
	},
	{
		y: 3,
		x1: 1,
		x1L: 0,
		x1R: 1,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
	{
		y: 1,
		x1: 2,
		x1L: 1,
		x1R: 1,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
	{
		y: 3,
		x1: 1,
		x1L: 1,
		x1R: 0,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
	{
		y: 2,
		x1: 1,
		x1L: 1,
		x1R: 0,
		x2: 2,
		x2L: 1,
		x2R: 1,
	},
	{
		y: 2,
		x1: 1,
		x1L: 0,
		x1R: 1,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
	{
		y: 3,
		x1: 2,
		x1L: 1,
		x1R: 1,
		x2: 2,
		x2L: 1,
		x2R: 1,
	},
	{
		y: 2,
		x1: 2,
		x1L: 1,
		x1R: 1,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
	{
		y: 2,
		x1: 1,
		x1L: 0,
		x1R: 1,
		x2: 1,
		x2L: 1,
		x2R: 0,
	},
]

/**
 * 根据坐标获取像素
 * @param {Number} x X 坐标 从0开始
 * @param {Number} y Y 坐标 从0开始
 * @returns Number
 */
Image.prototype.getPixelByXY = function (x, y) {
	return this.pixels[this.width * y + x];
}

/**
 * 切割数字
 * @returns Array
 */
Image.prototype.getNumbers = function () {
	let startX = -1;
	const numbers = [];

	// 拆分数字
	for (let x = 0; x < this.width; x++) {
		let isEnd = true;

		for (let y = 0; y < this.height; y++) {
			const pixel = this.getPixelByXY(x, y);

			if (pixel == 0) {
				isEnd = false;

				// 第一次出现黑色 记为开始位置
				if (startX < 0) {
					startX = x;
				}
			}
		}

		// 一个数字结束  重新开始找下一个数字
		if (isEnd && startX >= 0 && startX != x) {
			numbers.push({
				sX: startX,
				eX: x,
			})

			startX = -1;
		}
	}

	return numbers;
}

/**
 * 在sX - eX范围内 从左往右 从上往下 找第一个黑色坐标
 * @param {Number} sX 开始 X
 * @param {Number} eX 结束 X
 * @returns 
 */
Image.prototype.getBlackPointByRange = function (sX, eX) {
	for (let x = sX; x <= eX; x++) {
		for (let y = 0; y < this.height; y++) {
			if (this.getPixelByXY(x, y)) {
				return {
					x,
					y
				}
			}
		}
	}
}

Image.prototype.equalPoint = function (x1, x2, y) {
	for (let x = x1; x <= x2; x++) {
		if (this.getPixelByXY(x, y)) {
			return false;
		}
	}
	return true;
}

/**
 * 去除上下空白
 * @param {Array} arr 
 * @returns Array
 */
 Image.prototype.rmTupperAndLower = function (arr) {
	return arr.map(ele => {
		let y = 0;

		ele.sY = -1;

		for (; y < this.height; y++) {
			let isEnd = true;

			for (let x = ele.sX; x <= ele.eX; x++) {
				if (this.getPixelByXY(x, y) == 0) {
					isEnd = false;

					// 第一次出现黑色 记为开始位置
					if (ele.sY < 0) {
						ele.sY = y;
					}
				}
			}

			// 数字结束
			if (isEnd && ele.sY >= 0 && ele.sY != y) {
				ele.eY = y;

				return ele;
			}
		}

		ele.eY = y;
		return ele;
	})
}

/**
 * 获取阈值
 * @param {Array} arr 像素数组
 * @param {Number} preVal 上一次阈值
 * @returns 
 */
 Image.prototype.getThreshold = function (preVal = 0) {
	const arr = this.pixels;

	let val1 = 0,
		valCount1 = 0,
		val2 = 0,
		valCount2 = 0;

	for (let i = 0; i < arr.length; i++) {
		const ele = arr[i];
		if (ele > preVal) {
			val1 += ele;
			valCount1++;
		} else {
			val2 += ele;
			valCount2++;
		}
	}

	const result = (val1 / valCount1 + val2 / valCount2) / 2;

	if (Math.abs(result - preVal) < 5) {
		return result;
	}

	return this.getThreshold(result);
}

/**
 * 获取数字特征
 * @param {*} numberInfo 
 * @param {*} image 
 * @param {*} yDiff 
 * @returns 
 */
Image.prototype.getFeature = function (numberInfo, yDiff = 0) {
	// 计算 x1(2/5) x2(2/3) y(1/2)
	const yLine = parseInt((numberInfo.sX + numberInfo.eX) / 2 - yDiff);
	const xLine1 = parseInt((numberInfo.eY - numberInfo.sY) * 2 / 7 + numberInfo.sY);
	const xLine2 = parseInt((numberInfo.eY - numberInfo.sY) * 3 / 4 + numberInfo.sY);

	let yCount = 0,
		x1Count = 0,
		x1CountL = 0,
		x1CountR = 0,
		x2Count = 0,
		x2CountL = 0,
		x2CountR = 0;

	let pre = -2,
		pre2 = -2;

	for (let y = numberInfo.sY; y < numberInfo.eY; y++) {
		if (!this.getPixelByXY(yLine, y)) {
			if (y - pre > 1) {
				yCount++;
			}

			pre = y;
		}
	}

	pre = -2;

	for (let x = numberInfo.sX; x < numberInfo.eX; x++) {
		if (!this.getPixelByXY(x, xLine1)) {
			if (x - pre > 1) {
				if (this.equalPoint(x, yLine, xLine1) || x > yLine) {
					x1CountR++;
				} else {
					x1CountL++;
				}
				x1Count++;
			}
			pre = x;
		}
		if (!this.getPixelByXY(x, xLine2)) {
			if (x - pre2 > 1) {
				if (this.equalPoint(x, yLine, xLine2) || x > yLine) {
					x2CountR++;
				} else {
					x2CountL++;
				}
				x2Count++;
			}
			pre2 = x;
		}
	}

	return {
		yCount,
		x1Count,
		x1CountL,
		x1CountR,
		x2Count,
		x2CountL,
		x2CountR,
	}
}

Image.prototype.discernNumber = function (ele) {
	const {
		yCount,
		x1Count,
		x1CountL,
		x1CountR,
		x2Count,
		x2CountL,
		x2CountR,
	} = this.getFeature(ele);

	let result = -1;
	let diff = 999999;
	let zeroCount = 0;

	template.forEach((ele, index) => {
		let tmpZero = 0;

		const yDiff = yCount - ele.y;
		const x1Diff = x1Count - ele.x1;
		const x2Diff = x2Count - ele.x2;

		yDiff == 0 && tmpZero++;
		x1Diff == 0 && tmpZero++;
		x2Diff == 0 && tmpZero++;

		let tmp = yDiff + x1Diff + x2Diff;

		// console.log(index, yCount, x1Count, x1CountL, x1CountR, x2Count, x2CountL, x2CountR)
		tmp = Math.abs(tmp);

		if (tmpZero > zeroCount || tmp < diff) {
			diff = tmp;
			result = index;
			zeroCount = tmpZero;
		}
	})

	diff = 999999;

	if ([2, 3, 5, 7, 9].includes(result)) {
		[2, 3, 5, 7, 9].forEach(num => {
			const ele = template[num];

			let tmpZero = 0;

			const yDiff = yCount - ele.y;
			const x1Diff = x1Count - ele.x1;
			const x1DiffL = x1CountL - ele.x1L;
			const x1DiffR = x1CountR - ele.x1R;
			const x2Diff = x2Count - ele.x2;
			const x2DiffL = x2CountL - ele.x2L;
			const x2DiffR = x2CountR - ele.x2R;

			yDiff == 0 && tmpZero++;
			x1Diff == 0 && tmpZero++;
			x1DiffL == 0 && tmpZero++;
			x1DiffR == 0 && tmpZero++;
			x2Diff == 0 && tmpZero++;
			x2DiffL == 0 && tmpZero++;
			x2DiffR == 0 && tmpZero++;

			let tmp = yDiff +
				x1Diff +
				x1DiffL +
				x1DiffR +
				x2Diff +
				x2DiffL +
				x2DiffR;

			tmp = Math.abs(tmp);

			if (tmpZero > zeroCount || tmp < diff) {
				diff = tmp;
				result = num;
				zeroCount = tmpZero;
			}
		})
	}

	if (result == 10) {
		result = 7
	}

	return result;
}

function ocr(image) {
	//   if (sum > 30) {
	//     console.log(image.width,image.height)
	//     console.log(JSON.stringify(image.pixels))
	//   }
	// 找到阈值
	const effective = image.pixels.filter(ele => ele != 0 && ele != 255)
	let avg = effective.reduce((a, b) => a + b) / effective.length;

	avg = image.getThreshold(avg);

	// 二值化
	image.pixels = image.pixels.map(ele => ele <= avg * 0.8 ? 0 : 255);

	// 画出image
	// drawImage('#canvas', image);

	// 切割
	let numbers = image.getNumbers();

	// 去除上下空白
	numbers = image.rmTupperAndLower(numbers);

	// 对比
	return numbers.map(image.discernNumber.bind(image)).join('')
}

/**
 * 7   1
 * 0   9
 * 9   7
 * 
 * 以上值识别混乱  加重y占比？
 */

console.log(ocr(imageData));