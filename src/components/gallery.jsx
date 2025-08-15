import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;


const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const [likedImages, setLikedImages] = useState(
        JSON.parse(localStorage.getItem("likedImages")) || []
    );

    useEffect(() => {
        axios
            .get(`https://api.unsplash.com/photos/?client_id=${UNSPLASH_ACCESS_KEY}&per_page=20`)
            .then(res => setImages(res.data))
            .catch(err => console.error(err));
    }, []);

    const toggleLike = (img) => {
        let updatedLikes;
        if (likedImages.some(liked => liked.id === img.id)) {
            updatedLikes = likedImages.filter(liked => liked.id !== img.id);
        } else {
            updatedLikes = [...likedImages, img];
        }
        setLikedImages(updatedLikes);
        localStorage.setItem("likedImages", JSON.stringify(updatedLikes));
    };

    return (
        <div className="gallery-container">
            <h1>Virtual Art Gallery</h1>
            <div className="grid">

                {images.map(img => (
                    <div key={img.id} className="image-card" onClick={() => setSelectedImage(img)}>
                        <img src={img.urls.small} alt={img.alt_description} />
                        <div className="gallery-info">
                            <h3>{img.alt_description || "Untitled"}</h3>
                            <p>By: {img.user.name}</p>
                        </div>
                        <div className="hover-content">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent opening modal
                                    toggleLike(img);
                                }}
                            >
                                {likedImages.some(liked => liked.id === img.id) ? "💔 Unlike" : "❤️ Like"}
                            </button>
                        </div>
                    </div>
                ))}


            </div>

            {selectedImage && (
                <div className="modal">
                    <span className="close" onClick={() => setSelectedImage(null)}>&times;</span>
                    <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} />
                    <p>{selectedImage.description || selectedImage.alt_description}</p>
                    <button onClick={() => toggleLike(selectedImage)}>
                        {likedImages.some(liked => liked.id === selectedImage.id) ? "💔 Unlike" : "❤️ Like"}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Gallery;
