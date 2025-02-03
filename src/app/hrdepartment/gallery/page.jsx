'use client'
import React, { useState, useCallback } from 'react';
// import Gallery from 'react-photo-gallery';
// import Carousel, { Modal, ModalGateway } from 'react-images';
import Layout from '../components/layout/Layout';

const IOSGallery = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f8f8',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333'
      }}>Employee Photo Gallery</h1>
      
      {/* <Gallery
        photos={photos}
        onClick={openLightbox}
        margin={10}
        direction="column"
      /> */}

      {/* <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                src: x.src,
                caption: `Image ${currentImage + 1}`,
              }))}
              components={{
                Footer: ({ views }) => (
                  <div style={{ padding: '10px', textAlign: 'center' }}>
                    {views.map((view, index) => (
                      <img
                        key={index}
                        src={view.src}
                        alt={`Thumbnail ${index}`}
                        style={{
                          width: '80px',
                          height: 'auto',
                          cursor: 'pointer',
                          border: index === currentImage ? '2px solid blue' : 'none',
                          margin: '0 5px',
                          borderRadius: '4px'
                        }}
                        onClick={() => handleThumbnailClick(index)}
                      />
                    ))}
                  </div>
                )
              }}
            />
          </Modal>
        ) : null}
      </ModalGateway> */}
    </div>
  );
};

export default IOSGallery;














// 'use client'
// import React, { useState, useCallback } from 'react';
// import Gallery from 'react-photo-gallery';
// import Carousel, { Modal, ModalGateway } from 'react-images';
// import Layout from '../components/layout/Layout';

// const IOSGallery = ({ photos }) => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [viewerIsOpen, setViewerIsOpen] = useState(false);

//   const openLightbox = useCallback((event, { photo, index }) => {
//     setCurrentImage(index);
//     setViewerIsOpen(true);
//   }, []);

//   const closeLightbox = () => {
//     setCurrentImage(0);
//     setViewerIsOpen(false);
//   };

//   const handleThumbnailClick = (index) => {
//     setCurrentImage(index);
//   };

//   return (
//     <div style={{
//       padding: '20px',
//       backgroundColor: '#f8f8f8',
//       maxWidth: '1200px',
//       margin: '0 auto',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
//     }}>
//       <h1 style={{
//         textAlign: 'center',
//         marginBottom: '20px',
//         fontSize: '24px',
//         color: '#333'
//       }}>Employee Photo Gallery</h1>
      
//       <Gallery
//         photos={photos}
//         onClick={openLightbox}
//         margin={10}
//         direction="column"
//       />

//       <ModalGateway>
//         {viewerIsOpen ? (
//           <Modal onClose={closeLightbox}>
//             <Carousel
//               currentIndex={currentImage}
//               views={photos.map(x => ({
//                 src: x.src,
//                 caption: `Image ${currentImage + 1}`,
//               }))}
//               components={{
//                 Footer: ({ views }) => (
//                   <div style={{ padding: '10px', textAlign: 'center' }}>
//                     {views.map((view, index) => (
//                       <img
//                         key={index}
//                         src={view.src}
//                         alt={`Thumbnail ${index}`}
//                         style={{
//                           width: '80px',
//                           height: 'auto',
//                           cursor: 'pointer',
//                           border: index === currentImage ? '2px solid blue' : 'none',
//                           margin: '0 5px',
//                           borderRadius: '4px'
//                         }}
//                         onClick={() => handleThumbnailClick(index)}
//                       />
//                     ))}
//                   </div>
//                 )
//               }}
//             />
//           </Modal>
//         ) : null}
//       </ModalGateway>
//     </div>
//   );
// };

// export default IOSGallery;
