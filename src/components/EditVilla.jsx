import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditVilla = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data awal dari state location, kalau tidak ada default
  const initData = location.state || {
    title: 'De Santika Nirwana',
    location: 'Ubud, Bali',
    price: 5000000,
    images: [
      'https://i.pinimg.com/736x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg',
    ],
  };

  // Untuk debugging cek data awal:
  // console.log('initData:', initData);

  // State form
  const [title, setTitle] = useState(initData.title);
  const [loc, setLoc] = useState(initData.location);
  const [price, setPrice] = useState(initData.price);
  const [existingImages, setExistingImages] = useState(initData.images);
  const [newImages, setNewImages] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);

  useEffect(() => {
    if (newImages.length < 1) {
      setNewPreviews([]);
      return;
    }

    const objectUrls = newImages.map((file) => URL.createObjectURL(file));
    setNewPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImages]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      location: loc,
      price,
      existingImages,
      newImages,
    };

    console.log('Simpan data villa:', formData);
    alert('Data villa berhasil disimpan (simulasi)');

    navigate('/owner');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container py-5" style={{ marginTop: '3rem' }}>
      <h2 className="mb-4">Edit Villa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Judul Villa
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Lokasi
          </label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Harga per malam (Rp)
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            min={0}
          />
        </div>

        {/* Preview Gambar Lama */}
        <div className="mb-3">
          <label className="form-label">Gambar Lama</label>
          <div className="d-flex flex-wrap gap-3">
            {existingImages.length === 0 && (
              <p className="text-muted">Tidak ada gambar lama.</p>
            )}
            {existingImages.map((img, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img
                  src={img}
                  alt={`existing-${i}`}
                  style={{
                    width: 120,
                    height: 90,
                    objectFit: 'cover',
                    borderRadius: 8,
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(i)}
                  className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  style={{ borderRadius: '0 8px 0 8px' }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Gambar Baru */}
        <div className="mb-3">
          <label htmlFor="newImages" className="form-label">
            Upload Gambar Baru (bisa lebih dari satu)
          </label>
          <input
            type="file"
            id="newImages"
            className="form-control"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {/* Preview Gambar Baru */}
        {newPreviews.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Preview Gambar Baru</label>
            <div className="d-flex flex-wrap gap-3">
              {newPreviews.map((src, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img
                    src={src}
                    alt={`new-${i}`}
                    style={{
                      width: 120,
                      height: 90,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    style={{ borderRadius: '0 8px 0 8px' }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-primary px-4">
            Simpan
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVilla;
