(function () {
  "use strict";

  // Mobile nav toggle
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      const open = mobileNav.hidden === false;
      mobileNav.hidden = open;
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Sample lane demo data
  const demo = document.getElementById("demo-card");
  const select = document.getElementById("lane-select");
  const samples = [
    {
      lane: "Chicago, IL → Atlanta, GA",
      tag: "Dry van · Contract · 10/wk",
      sell: "$2,450",
      buy: "$1,950–$2,100",
      margin: "$350–$500",
      risk: "High",
      riskClass: "qc-risk-high",
      why: ["Carrier cost up <strong>12%</strong> in last 30 days", "Low outbound capacity", "Monday pickup"],
    },
    {
      lane: "Dallas, TX → Chicago, IL",
      tag: "Reefer · Spot · 3 loads",
      sell: "$2,900",
      buy: "$2,500–$2,650",
      margin: "$250–$400",
      risk: "Medium",
      riskClass: "qc-risk-high",
      why: ["Backhaul imbalance", "Reefer availability tightening", "48-hour pickup window"],
    },
    {
      lane: "Phoenix, AZ → Denver, CO",
      tag: "Flatbed · Spot · 1 load",
      sell: "$1,800",
      buy: "$1,350–$1,500",
      margin: "$300–$450",
      risk: "Low",
      riskClass: "qc-risk-low",
      why: ["Stable lane with consistent carrier pool", "Reasonable lead time", "Standard tarping"],
    },
    {
      lane: "Fresno, CA → New York, NY",
      tag: "Produce · Contract · 8/wk",
      sell: "$5,600",
      buy: "$5,000–$5,300",
      margin: "$300–$600",
      risk: "High",
      riskClass: "qc-risk-high",
      why: ["Seasonal produce surge", "Refrigerated capacity scarce", "Long-haul deadhead on return"],
    },
  ];

  if (demo && select) {
    function render(i) {
      const s = samples[i];
      document.getElementById("demo-lane").textContent = s.lane;
      document.getElementById("demo-tag").textContent = s.tag;
      document.getElementById("demo-sell").textContent = s.sell;
      document.getElementById("demo-buy").textContent = s.buy;
      document.getElementById("demo-margin").textContent = s.margin;
      const risk = document.getElementById("demo-risk");
      risk.textContent = "Risk: " + s.risk;
      risk.className = "qc-risk " + s.riskClass;
      document.getElementById("demo-why").innerHTML = s.why
        .map((w) => "<li>" + w + "</li>")
        .join("");
    }
    select.addEventListener("change", function () {
      render(parseInt(select.value, 10));
    });
  }

  // Reveal on scroll
  const revealables = document.querySelectorAll(
    ".card, .step, .icp-list, .faq details, .quote-card"
  );
  if ("IntersectionObserver" in window && revealables.length) {
    revealables.forEach(function (el) {
      el.classList.add("reveal");
    });
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealables.forEach(function (el) { io.observe(el); });
  }
})();
