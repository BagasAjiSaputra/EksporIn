# EksporIn

Platform Komoditas Ekspor — REST API yang dibangun dengan Go untuk mengelola dan menampilkan data komoditas ekspor.

---

## Gambaran Umum

EksporIn adalah platform API backend yang dirancang untuk memfasilitasi pengelolaan dan penemuan komoditas ekspor. Sistem ini menyediakan akses data terstruktur untuk daftar komoditas, mendukung kebutuhan eksportir, pembeli, dan operator logistik.

---

## Teknologi yang Digunakan

| Komponen | Detail |
|----------|--------|
| Bahasa | Go (Golang) |
| Routing | Custom router |
| Database | Relasional (PostgreSQL / MySQL) |
| ORM / Migrasi | GORM dengan auto-migration |
| Environment | godotenv |

---

## Struktur Proyek

```
EksporIn/
├── config/          # Koneksi dan konfigurasi database
├── migrations/      # Migrasi skema database
├── models/          # Definisi model dan struct data
├── modules/         # Logika bisnis dan handler request
├── routers/         # Definisi rute API
├── .env.example     # Template variabel environment
├── go.mod           # Definisi modul Go
└── main.go          # Titik masuk aplikasi
```

---

## Prasyarat

- Go versi 1.20 atau lebih tinggi
- Database relasional yang berjalan (PostgreSQL atau MySQL)
- Git

---

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/BagasAjiSaputra/EksporIn.git
cd EksporIn
```

### 2. Konfigurasi Variabel Environment

Salin file contoh environment dan isi dengan nilai yang sesuai:

```bash
cp .env.example .env
```

Edit file `.env` sesuai konfigurasi kamu:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=username_database
DB_PASS=password_database
DB_NAME=eksporin
APP_PORT=8080
```

### 3. Install Dependensi

```bash
go mod tidy
```

### 4. Jalankan Aplikasi

```bash
go run main.go
```

Aplikasi akan secara otomatis terhubung ke database, menjalankan migrasi, dan memulai HTTP server pada port yang telah dikonfigurasi.

---

## Build untuk Produksi

```bash
go build -o eksporin .
./eksporin
```



---

## Clean Architecture

Implementasi Clean Architecture API Golang untuk Long Term Development