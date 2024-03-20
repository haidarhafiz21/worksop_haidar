const express = require('express');
const model_mahasiswa = require('../module/m_mahasiswa');
const router = express.Router();

const handleAsync = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const renderTemplateWithData = async (res, template, data) => {
  const rows = await model_mahasiswa.getAll();
  res.render(template, { ...data, data: rows });
};

router.get('/', handleAsync(async (req, res) => {
  await renderTemplateWithData(res, 'mahasiswa/index', {});
}));

router.get('/create', (req, res) => {
  res.render('mahasiswa/create');
});

router.post('/store', handleAsync(async (req, res) => {
  const data = { ...req.body };
  await model_mahasiswa.writeData(data);
  req.flash('success', 'Berhasil menambahkan data');
  res.redirect('/mahasiswa');
}));

router.get(`/edit/(:id)`, async (req,res,next) => {
    let id = req.params.id;
    let rows = await model_mahasiswa.editData(id);
    res.render(`mahasiswa/edit`, {
        id: rows[0].id_mahasiswa,
        nrp:             rows[0].nrp,
        nama_depan:      rows[0].nama_depan, 
        nama_belakang:   rows[0].nama_belakang,
        jenis_kelamin:   rows[0].jenis_kelamin,
        agama:           rows[0].agama,
        umur:            rows[0].umur,
        tinggi_badan:    rows[0].tinggi_badan,
        gol_darah:       rows[0].gol_darah,
        alamat:          rows[0].alamat,
        hobi:            rows[0].hobi,   
        email:           rows[0].email,
        no_telpon:       rows[0].no_telpon,
        asal_sekolah:    rows[0].asal_sekolah,
        tahun_lulus:     rows[0].tahun_lulus
    });
})

router.post('/update/:id', handleAsync(async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  await model_mahasiswa.updateData(id, data);
  req.flash('success', 'Berhasil mengubah data');
  res.redirect('/mahasiswa');
}));

router.get('/delete/:id', handleAsync(async (req, res) => {
  const { id } = req.params;
  await model_mahasiswa.deleteData(id);
  req.flash('success', 'Berhasil menghapus data');
  res.redirect('/mahasiswa');
}));

module.exports = router;
