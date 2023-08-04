<template>
  <div class="container" style="background: linear-gradient(to bottom, #0e0e0e, #222222); color: white; padding: 20px;">
    <h1 style="text-align: center; font-size: 48px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);">Origin News</h1>
    <div class="search-bar">
      <input v-model="searchTerm" @input="searchNews" type="text" placeholder="Search News..." />
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="article in visibleNewsData" :key="article.title" class="news-item">
        <div class="news-image">
          <img :src="getValidImageUrl(article.urlToImage)" alt="Article Image" />
        </div>
        <div class="news-content">
          <h2 v-html="highlightText(article.title, searchTerm)"></h2>
          <p v-html="highlightText(article.description, searchTerm)"></p>
          <a :href="article.url" target="_blank" @click.prevent="openArticleLink(article.url)">Read More</a>
        </div>
      </div>
      <div v-if="!visibleNewsData.length && !loadingMore" class="no-news-found">No news found for '{{ searchTerm }}'.</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash"; // Import debounce from Lodash

export default {
  name: "NewsDashboard",
  data() {
    return {
      newsData: [],
      visibleNewsData: [],
      loading: true,
      loadingMore: false,
      pageSize: 10, // Number of news articles to load per page
      currentPage: 1, // Current page number
      searchTerm: "", // Search term entered by the user
    };
  },
  created() {
    this.fetchNewsData();
  },
  methods: {
    async fetchNewsData() {
      const apiKey = "b9512ee73ec74d18910ba65c7d82dd15"; // Replace with your NewsAPI key
      const apiUrls = [
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`, // General news from India
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`, // General news from USA
        `https://newsapi.org/v2/everything?q=Apple&from=${this.getCurrentDate()}&sortBy=popularity&apiKey=${apiKey}`, // Apple-related news from India
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`, // News from BBC News
        `https://newsapi.org/v2/top-headlines?q=trump&apiKey=${apiKey}`, // News related to "trump"
      ];

      try {
        const responses = await Promise.all(apiUrls.map(url => axios.get(url)));
        this.newsData = responses.reduce((acc, response) => acc.concat(response.data.articles), []);
        this.newsData.sort((a, b) => this.sortNewsData(a, b)); // Sort newsData based on custom logic
        this.loadMore(); // Load the initial set of news articles
        this.loading = false;
      } catch (error) {
        console.error("Error fetching news data:", error);
        this.loading = false;
      }
    },
    sortNewsData(a, b) {
      // Custom sorting logic to prioritize news from India
      const aCountry = a.source?.country || "";
      const bCountry = b.source?.country || "";
      if (aCountry === 'in' && bCountry !== 'in') {
        return -1;
      } else if (aCountry !== 'in' && bCountry === 'in') {
        return 1;
      } else {
        return 0;
      }
    },
    getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getValidImageUrl(url) {
      // Some news articles may have a null or empty image URL
      // In that case, we can provide a default image URL or a placeholder image
      if (!url) {
        return "https://via.placeholder.com/200x100"; // Placeholder image URL
      }
      return url;
    },
    openArticleLink(url) {
      window.open(url, '_blank'); // Opens the article link in a new tab
    },
    loadMore() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.visibleNewsData = this.newsData.slice(startIndex, endIndex);
      this.currentPage++;
    },
    onScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (documentHeight - (windowHeight + scrollTop) < 50) {
        this.fetchMoreNews();
      }
    },
    fetchMoreNews() {
      if (this.loadingMore) return;
      const startIndex = this.currentPage * this.pageSize;
      const remainingNews = this.newsData.slice(startIndex, startIndex + this.pageSize);

      if (remainingNews.length > 0) {
        this.loadingMore = true;
        setTimeout(() => {
          this.visibleNewsData = this.visibleNewsData.concat(remainingNews);
          this.currentPage++;
          this.loadingMore = false;
        }, 500); // Add a slight delay to simulate loading more data
      }
    },
    highlightText(text, searchTerm) {
      if (!searchTerm) return text;
      if (!text) return '';
      const regex = new RegExp(`${this.escapeRegExp(searchTerm)}`, "gi"); // Added 'i' flag for case-insensitive search
      return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    },
    escapeRegExp(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },
    searchNews: debounce(function() {
      const searchTerm = this.searchTerm.trim();
      if (!searchTerm) {
        this.currentPage = 1;
        this.loadingMore = false;
        this.visibleNewsData = this.newsData.slice(0, this.pageSize);
        return;
      }

      const filteredNews = this.newsData.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatch = article.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || descriptionMatch;
      });

      this.currentPage = 1;
      this.loadingMore = false;
      this.visibleNewsData = filteredNews.slice(0, this.pageSize);

      if (this.visibleNewsData.length === 0) {
        this.loadingMore = true;
        this.fetchMoreNews();
      }
    }, 500),
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style>
/* Your custom styles here (if needed) */
.news-item {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.news-image {
  width: 200px;
  margin-right: 20px;
}

.news-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.news-content {
  flex: 1;
}

.news-content h2 {
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 10px;
}

.news-content p {
  margin-top: 0;
  margin-bottom: 10px;
  line-height: 1.5;
}

.news-content a {
  color: #ffffff;
  text-decoration: underline;
}

.search-bar {
  margin: 20px 0;
  text-align: center;
}

.search-bar input {
  width: 100%;
  max-width: 600px;
  padding: 10px 20px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 30px;
  outline: none;
}

.highlight {
  background-color: orange; /* Orange highlight color */
}

.no-news-found {
  text-align: center;
  margin-top: 20px;
  color: #ff6666;
  font-size: 18px;
}
</style>
