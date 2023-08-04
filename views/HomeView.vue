<template>
  <div class="home">
    <div class="header">
      <h1 class="logo">Origin News</h1>
      <p class="slogan">Stay informed with the latest news and updates from around the world.</p>
    </div>

    <div class="image-gallery">
      <!-- Show the current image in the slideshow -->
      <div class="slideshow-image" :style="{ height: imageHeight }">
        <img :src="currentImage" :alt="'Image ' + (currentIndex + 1)" @load="onImageLoad" />
        <div class="image-caption">
          <h3>Image {{ currentIndex + 1 }}</h3>
          <p>{{ imageDescriptions[currentIndex] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      currentIndex: 0,
      images: [
        require('@/assets/image1.jpg'),
        require('@/assets/image2.jpg'),
        require('@/assets/image3.jpg'),
        require('@/assets/image4.jpg'),
        require('@/assets/image5.jpg'),
        // Add more image URLs here
      ],
      imageHeight: "auto",
      currentImage: null,
      imageDescriptions: [
        "‘He has no valid argument’: Kejriwal responds to Amit Shah's attack on Delhi ordinance bill.",
        "How layoffs and A.I. are impacting tech workers.",
        "Navigating the Galaxy: Spotting All the Sneaky References in Guardians of the Galaxy Vol. 3.",
        "Haryana Nuh Violence Live Updates: 176 arrested so far; panel set up to monitor social media for fake news.",
        "Most Israelis oppose the court overhaul. But a minority is backing Netanyahu to the hilt.",
        // Add more image descriptions here
      ],
    };
  },
  methods: {
    // Function to start the slideshow
    startSlideshow() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.currentImage = this.images[this.currentIndex];
      }, 5000); // Switch image every 5 seconds
    },
    // Set the container height dynamically based on the loaded image's height
    onImageLoad(event) {
      this.imageHeight = event.target.naturalHeight + "px";
    },
  },
  mounted() {
    // Set the initial image and container height
    this.currentImage = this.images[this.currentIndex];
    this.imageHeight = "auto";

    // Start the slideshow when the component is mounted
    this.startSlideshow();
  },
};
</script>

<style>
/* Add custom styles for the Home page */
.home {
  background-color: #f5f5f5;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  font-size: 36px;
  color: #1e3a8a;
  font-weight: bold;
}

.slogan {
  font-size: 18px;
  color: #555;
}

.image-gallery {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.slideshow-image {
  width: 90%; /* Reduce the width to 90% to leave some space on both sides */
  max-width: 80vh; /* Set the maximum width to 80% of the viewport height */
  max-height: 50vh; /* Set the maximum height to half of the viewport height */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center; /* Center the image horizontally */
  align-items: center; /* Center the image vertically */
}

.slideshow-image img {
  max-width: 100%;
  max-height: 100%; /* Set the image height to fill the container */
  object-fit: cover; /* Scale the image as much as possible while maintaining aspect ratio */
  display: block;
}

.image-caption {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
  text-align: left;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.image-caption h3 {
  margin-bottom: 5px;
  font-size: 20px;
}

.image-caption p {
  font-size: 14px;
}

</style>
