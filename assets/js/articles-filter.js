(() => {
  const normalize = (value) => String(value || "").toLowerCase().trim();

  const initArticlesDirectory = () => {
    const directory = document.querySelector("[data-articles-directory]");

    if (!directory) {
      return;
    }

    const input = directory.querySelector("#articles-filter-input");
    const clearButton = directory.querySelector("[data-articles-filter-clear]");
    const status = directory.querySelector("[data-articles-filter-status]");
    const emptyState = directory.querySelector("[data-articles-empty-state]");
    const categoryButtons = Array.from(directory.querySelectorAll("[data-articles-category]"));
    const cards = Array.from(directory.querySelectorAll(".article-card"));
    const params = new URLSearchParams(window.location.search);
    let activeCategory = "";
    let activeCategoryLabel = "";

    const categoryLabelMap = new Map(
      categoryButtons.map((button) => [normalize(button.dataset.category), button.textContent.trim()])
    );

    const syncUrl = () => {
      const nextParams = new URLSearchParams(window.location.search);
      const queryValue = input.value.trim();

      if (queryValue) {
        nextParams.set("q", queryValue);
      } else {
        nextParams.delete("q");
      }

      if (activeCategory) {
        nextParams.set("category", activeCategory);
      } else {
        nextParams.delete("category");
      }

      const nextQuery = nextParams.toString();
      const nextUrl = nextQuery ? `${window.location.pathname}?${nextQuery}` : window.location.pathname;
      window.history.replaceState({}, "", nextUrl);
    };

    const setActiveCategory = (nextCategory, nextLabel) => {
      activeCategory = normalize(nextCategory);
      activeCategoryLabel = activeCategory ? (nextLabel || categoryLabelMap.get(activeCategory) || activeCategory) : "";

      categoryButtons.forEach((button) => {
        const isActive = normalize(button.dataset.category) === activeCategory;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    };

    const updateResults = () => {
      const rawQuery = input.value.trim();
      const terms = normalize(rawQuery).split(/\s+/).filter(Boolean);
      let visibleCount = 0;

      cards.forEach((card) => {
        const searchText = normalize(card.dataset.searchText);
        const categories = normalize(card.dataset.categories).split("|").filter(Boolean);
        const matchesSearch = terms.length === 0 || terms.every((term) => searchText.includes(term));
        const matchesCategory = !activeCategory || categories.includes(activeCategory);
        const matches = matchesSearch && matchesCategory;

        card.classList.toggle("is-hidden", !matches);
        card.hidden = !matches;
        card.setAttribute("aria-hidden", matches ? "false" : "true");

        if (matches) {
          visibleCount += 1;
        }
      });

      clearButton.hidden = !rawQuery;
      emptyState.hidden = visibleCount !== 0;

      if (!terms.length && !activeCategory) {
        status.textContent = `Showing all ${cards.length} articles.`;
      } else {
        const articleLabel = visibleCount === 1 ? "article" : "articles";
        let message = `Showing ${visibleCount} ${articleLabel}`;

        if (activeCategoryLabel) {
          message += ` in ${activeCategoryLabel}`;
        }

        if (rawQuery) {
          message += ` for "${rawQuery}".`;
        } else {
          message += ".";
        }

        status.textContent = message;
      }

      syncUrl();
    };

    input.addEventListener("input", updateResults);

    clearButton.addEventListener("click", () => {
      input.value = "";
      input.focus();
      updateResults();
    });

    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const nextCategory = button.dataset.category || "";
        const nextLabel = nextCategory ? button.textContent.trim() : "";
        setActiveCategory(nextCategory, nextLabel);
        updateResults();
      });
    });

    directory.addEventListener("click", (event) => {
      const tag = event.target.closest("[data-article-category-tag]");

      if (!tag) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const nextCategory = tag.dataset.articleCategoryTag || "";
      setActiveCategory(nextCategory, tag.textContent.trim());
      updateResults();
    });

    directory.addEventListener("keydown", (event) => {
      const tag = event.target.closest("[data-article-category-tag]");

      if (!tag || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }

      event.preventDefault();
      const nextCategory = tag.dataset.articleCategoryTag || "";
      setActiveCategory(nextCategory, tag.textContent.trim());
      updateResults();
    });

    input.value = params.get("q") || "";
    setActiveCategory(params.get("category") || "", "");
    updateResults();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initArticlesDirectory);
  } else {
    initArticlesDirectory();
  }
})();
