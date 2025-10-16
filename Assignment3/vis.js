

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { url: "./dataset/videogames_wide.csv", format: { type: "csv" } },
  transform: [
    // Aggregate global sales by genre and platform
    {
      aggregate: [{ op: "sum", field: "Global_Sales", as: "TotalSales" }],
      groupby: ["Genre", "Platform"]
    },
    // Filter to show only the top 5 platforms (adjust list as needed)
    {
      filter: {
        field: "Platform",
        oneOf: ["PS4", "PS3", "X360", "Wii", "DS"]
      }
    }
  ],
  mark: { type: "bar", cornerRadiusTopLeft: 2, cornerRadiusTopRight: 2 },
  encoding: {
    x: { field: "Genre", type: "nominal", title: "Genre", sort: "-y" },
    y: { field: "TotalSales", type: "quantitative", title: "Sum of Global Sales (millions)" },
    xOffset: { field: "Platform", type: "nominal" },
    color: {
      field: "Platform",
      type: "nominal",
      title: "Platform",
      scale: { scheme: "pastel1" }
    },
    tooltip: [
      { field: "Genre", type: "nominal" },
      { field: "Platform", type: "nominal" },
      { field: "TotalSales", type: "quantitative", title: "Global Sales (M)", format: ".1f" }
    ]
  },
  width: "container",
  height: 320,
  config: {
    background: "transparent",
    view: { stroke: "transparent" },
    axis: { labelColor: "white", titleColor: "white", grid: false },
    legend: { labelColor: "white", titleColor: "white" },
    title: { color: "white" }
  },
  title: "Global Sales by Genre & Platform (Top 5 Platforms)"
};

vegaEmbed("#view", spec, { actions: false });

























// Visualization 2 — Multi-series Line (simple, NO D3)
// Shows Global Sales over time for one Genre, colored by Platform.

var viz2Spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Sales over time by platform for a single genre.",
  data: { url: "./dataset/videogames_wide.csv", format: { type: "csv" } },

  // Keep this tiny: just pick ONE genre to show (edit the value to try others)
  transform: [
    { filter: "datum.Genre === 'Action'"},
    { aggregate: [{ op: "sum", field: "Global_Sales", as: "TotalSales" }],
      groupby: ["Year", "Platform"] }
  ],

  mark: { type: "line", point: true },

  encoding: {
    x: { field: "Year", type: "quantitative", title: "Year" },
    y: { field: "TotalSales", type: "quantitative", title: "Global Sales (millions)" },
    color: { field: "Platform", type: "nominal", title: "Platform" },
    tooltip: [
      { field: "Year", type: "quantitative" },
      { field: "Platform", type: "nominal" },
      { field: "TotalSales", type: "quantitative", title: "Global Sales (M)", format: ".1f" }
    ]
  },

  title: { text: "Sales Over Time by Platform — Genre: Action", anchor: "start", color: "white" },
  width: "container",
  height: 320,
  config: {
    background: "transparent",
    view: { stroke: "transparent" },
    axis: { labelColor: "white", titleColor: "white", grid: true, domain: false, tickSize: 0 },
    legend: { labelColor: "white", titleColor: "white" }
  }
};



var viz3Spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Sales over time by platform for a single genre.",
  data: { url: "./dataset/videogames_wide.csv", format: { type: "csv" } },

  // Keep this tiny: just pick ONE genre to show (edit the value to try others)
  transform: [
    { filter: "datum.Genre === 'Puzzle'", oneOf: ["Wii"] },
    { aggregate: [{ op: "sum", field: "Global_Sales", as: "TotalSales" }],
      groupby: ["Year", "Platform"] }
  ],

  mark: { type: "line", point: true },

  encoding: {
    x: { field: "Year", type: "quantitative", title: "Year" },
    y: { field: "TotalSales", type: "quantitative", title: "Global Sales (millions)" },
    color: { field: "Platform", type: "nominal", title: "Platform" },
    tooltip: [
      { field: "Year", type: "quantitative" },
      { field: "Platform", type: "nominal" },
      { field: "TotalSales", type: "quantitative", title: "Global Sales (M)", format: ".1f" }
    ]
  },

  title: { text: "Sales Over Time by Platform — Genre: Puzzle", anchor: "start", color: "white" },
  width: "container",
  height: 360,
  config: {
    background: "transparent",
    view: { stroke: "transparent" },
    axis: { labelColor: "white", titleColor: "white", grid: true, domain: false, tickSize: 0 },
    legend: { labelColor: "white", titleColor: "white" }
  }
};


vegaEmbed("#view2", viz2Spec, { actions: false });
vegaEmbed("#secondview2", viz3Spec, { actions: false });


































// ==== Visualization 3: Regional Sales vs Platform (Heatmap) ====
// Uses videogames_long.csv with region columns.
// Keeps Top 10 platforms by total (NA+EU+JP+Other) sales.

const spec3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Regional Sales by Platform (Top 10 Platforms)",
  data: {
    url: "./dataset/videogames_wide.csv",
    format: { type: "csv", parse: {
      NA_Sales: "number", EU_Sales: "number", JP_Sales: "number", Other_Sales: "number"
    }}
  },
  transform: [
    // Wide -> long: Region + Sales
    { fold: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"], as: ["RegionRaw", "Sales"] },
    // Clean region names
    { calculate: "replace(replace(replace(replace(datum.RegionRaw,'_Sales',''),'NA','North America'),'EU','Europe'),'JP','Japan')", as: "Region" },

    // Sum to Platform × Region (in case rows are per game)
    { aggregate: [{ op: "sum", field: "Sales", as: "Sales" }], groupby: ["Platform","Region"] },

    // Compute totals per platform to rank & filter Top 10
    { joinaggregate: [{ op: "sum", field: "Sales", groupby: ["Platform"], as: "PlatformTotal" }] },
    { window: [{ op: "rank", as: "PlatformRank" }], sort: [{ field: "PlatformTotal", order: "descending" }] },
    { filter: "datum.PlatformRank <= 10" }
  ],

  mark: { type: "rect" },
   width: "container",
  height: 360,

  encoding: {
    x: {
      field: "Region", type: "nominal",
      sort: ["North America","Europe","Japan","Other"], title: "Region"
    },
    y: {
      field: "Platform", type: "nominal",
      sort: "-x", title: "Platform"   // will respect Top-10 order by PlatformTotal
    },
    color: {
      field: "Sales", type: "quantitative",
      title: "Sales (Millions)"
      // You can add: scale: { scheme: "blues" } if you want a single-hue scheme
    },
    tooltip: [
      { field: "Platform", type: "nominal" },
      { field: "Region", type: "nominal" },
      { field: "Sales", type: "quantitative", title: "Sales (M)", format: ".1f" }
    ]
  },

  // Optional: draw numbers inside each cell (uncomment layer below)
  // layer: [
  //   { mark: { type: "rect" }, encoding: { ... as above ... } },
  //   { mark: { type: "text", dy: 0 }, encoding: { text: { field: "Sales", type: "quantitative", format: ".1f" }, color: { value: "white" } } }
  // ],

  config: {
    background: "transparent",
    view: { stroke: null },
    axis: { labelColor: "white", titleColor: "white", grid: false },
    legend: { labelColor: "white", titleColor: "white" },
    title: { color: "white" }
  }
};

vegaEmbed("#view3", spec3, { actions: false });






































// === Vis 4: NA vs JP (Scatter/Bubble) — super simple ===
// If dots look cut off, bump MAX up (e.g., 1200). That's it.
const MAX = 1000;

const spec4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Platforms: North America vs Europe (Top 12 by Global)",
  width: "container",
  height: 360,
  data: {
    url: "./dataset/videogames_wide.csv",
    format: { type: "csv", parse: { NA_Sales: "number", EU_Sales: "number", Global_Sales: "number" } }
  },
  transform: [
    // one row per platform
    {
      aggregate: [
        { op: "sum", field: "NA_Sales", as: "NA" },
        { op: "sum", field: "EU_Sales", as: "EU" },
        { op: "sum", field: "Global_Sales", as: "Global" }
      ],
      groupby: ["Platform"]
    },
    // keep top 12 globally
    { window: [{ op: "rank", as: "r" }], sort: [{ field: "Global", order: "descending" }] },
    { filter: "datum.r <= 12" }
  ],
  layer: [
    // y = x helper line
    {
      data: { values: [{ v: 0 }, { v: MAX }] },
      mark: { type: "line", strokeDash: [4, 4], strokeWidth: 1, color: "#aaaaaa" },
      encoding: {
        x: { field: "v", type: "quantitative", scale: { domain: [0, MAX] } },
        y: { field: "v", type: "quantitative", scale: { domain: [0, MAX] } }
      }
    },
    // bubbles
    {
      mark: { type: "point", filled: true, opacity: 0.9 },
      encoding: {
        x: { field: "NA", type: "quantitative", title: "NA Sales (M)", scale: { domain: [0, MAX] } },
        y: { field: "EU", type: "quantitative", title: "EU Sales (M)", scale: { domain: [0, MAX] } },
        size: { field: "Global", type: "quantitative", title: "Global Sales (M)", scale: { range: [40, 800] } },
        color: { field: "Platform", type: "nominal", title: "Platform" },
        tooltip: [
          { field: "Platform", type: "nominal" },
          { field: "NA", type: "quantitative", title: "NA (M)", format: ".1f" },
          { field: "EU", type: "quantitative", title: "EU (M)", format: ".1f" },
          { field: "Global", type: "quantitative", title: "Global (M)", format: ".1f" }
        ]
      }
    }
  ],
  config: {
    background: "transparent",
    view: { stroke: null },
    axis: { labelColor: "white", titleColor: "white", grid: true, gridColor: "#ffffffff", gridOpacity: 0.3, tickSize: 0, domain: false },
    legend: { labelColor: "white", titleColor: "white" },
    title: { color: "white" }
  }
};

vegaEmbed("#view4", spec4, { actions: false });
