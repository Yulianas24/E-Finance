let table_masuk = document.getElementById('table_pemasukan');
let table_keluar = document.getElementById('table_pengeluaran');
data_masuk = JSON.parse(localStorage.getItem('data_masuk'));
data_keluar = JSON.parse(localStorage.getItem('data_keluar'));

window.onload = () => {
  transaksi();
}

// menampilkan data
function transaksi() {
  table_masuk.innerHTML = null;
  table_keluar.innerHTML = null;
  let total_masuk = 0;
  let total_keluar = 0;
  if (localStorage.getItem('data_masuk')) {
    data_masuk.forEach(element => {
      total_masuk += element['jumlah_masuk'];
      table_masuk.innerHTML += "<tr><td>" + element['keterangan_masuk'] + "</td><td>" +
        element['kategori_masuk'] + "</td><td>" + element['tanggal_masuk'] + "</td><td>Rp. " +
        Intl.NumberFormat('en-US').format(element['jumlah_masuk']) + "</td></tr>";
    });
  }
  if (localStorage.getItem('data_keluar')) {
    data_keluar.forEach(element => {
      total_keluar += element['jumlah_keluar'];
      table_keluar.innerHTML += "<tr><td>" + element['keterangan_keluar'] + "</td><td>" +
        element['kategori_keluar'] + "</td><td>" + element['tanggal_keluar'] + "</td><td>Rp. " +
        Intl.NumberFormat('en-US').format(element['jumlah_keluar']) + "</td></tr>";
    });
  }
  let sisa_saldo = "Rp." + Intl.NumberFormat('en-US').format(total_masuk - total_keluar);
  let detail_pemasukan = "Rp." + Intl.NumberFormat('en-US').format(total_masuk);
  let detail_pengeluaran = "Rp." + Intl.NumberFormat('en-US').format(total_keluar);
  document.getElementById('sisa_saldo').innerHTML = sisa_saldo;
  document.getElementById('detail_saldo').innerHTML = sisa_saldo;
  document.getElementById('detail_pemasukan').innerHTML = detail_pemasukan;
  document.getElementById('detail_pengeluaran').innerHTML = detail_pengeluaran;
}

// input pemasukan
let pemasukan = document.getElementById('pemasukan');
pemasukan.addEventListener('submit', event => {
  event.preventDefault();
  if (localStorage.getItem('data_masuk') == null) {
    console.log("data pemasukan pertama");
    data_masuk = [];
  }
  let data = {
    'tanggal_masuk': (pemasukan['tanggal_masuk'].value),
    'kategori_masuk': (pemasukan['kategori_masuk'].value),
    'jumlah_masuk': parseInt(pemasukan['jumlah_masuk'].value),
    'keterangan_masuk': (pemasukan['keterangan_masuk'].value)
  };
  data_masuk.push(data);
  localStorage.setItem('data_masuk', JSON.stringify(data_masuk));
  console.log(data_masuk);
  transaksi();
  alert("Input berhasil !!");
});

// Input pengeluaran
let pengeluaran = document.getElementById('pengeluaran');
pengeluaran.addEventListener('submit', event => {
  event.preventDefault();
  if (localStorage.getItem('data_keluar') == null) {
    console.log("data pengeluaran pertama");
    data_keluar = [];
  }
  let data = {
    'tanggal_keluar': (pengeluaran['tanggal_keluar'].value),
    'kategori_keluar': (pengeluaran['kategori_keluar'].value),
    'jumlah_keluar': parseInt(pengeluaran['jumlah_keluar'].value),
    'keterangan_keluar': (pengeluaran['keterangan_keluar'].value)
  };
  data_keluar.push(data);
  localStorage.setItem('data_keluar', JSON.stringify(data_keluar));
  console.log(data_keluar);
  transaksi();
  alert("Input berhasil !!");
});

// format data
function formatData() {
  let kondisi = confirm('Apakah anda yakin?');
  if (kondisi) {
    window.localStorage.clear();
    transaksi();
  }
}









