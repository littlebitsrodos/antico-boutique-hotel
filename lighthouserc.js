module.exports = {
  ci: {
    collect: {
      staticDistDir: "./",
      url: [
        "index.html",
        "rooms.html",
        "about.html",
        "contact.html",
        "chef-rocco.html",
        "retreats.html",
        "experience.html",
        "offline.html",
        "room-courtyard.html",
        "room-knights-suite.html",
        "room-scholars-study.html",
        "room-tower-suite.html",
        "room-venetian.html",
      ],
    },

    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
