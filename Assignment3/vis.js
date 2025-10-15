

// Visualization 1 — Grouped Bar: Global Sales by Genre & Platform
// Uses the *wide* dataset so we can rely on Global_Sales directly.

const TOP_N_PLATFORMS = 5; // Looking into top 5 platforms

async function loadData() {
  // Load the wide CSV; coerce Global_Sales to number
  const rows = await d3.csv("./dataset/videogames_wide.csv", d => ({
    ...d,
    Global_Sales: +d.Global_Sales  // millions
  }));
  return rows;
}

loadData().then(async (data) => {
  // --- 1) Pick Top-N Platforms by total Global_Sales (done in plain JS) ---
  const totals = new Map(); // Platform -> total Global_Sales
  for (const r of data) {
    totals.set(r.Platform, (totals.get(r.Platform) || 0) + r.Global_Sales);
  }
  const topPlatforms = Array.from(totals.entries())
    .sort((a, b) => b[1] - a[1])      // largest first
    .slice(0, TOP_N_PLATFORMS)        // keep N
    .map(([p]) => p);                 // just platform names

  // Filter to those Top-N platforms to keep the grouped bars readable
  const filtered = data.filter(d => topPlatforms.includes(d.Platform));

  // --- 2) Build a simple grouped bar spec ---
  // We aggregate by Genre × Platform, then use xOffset(Platform) to group bars per Genre.
  const spec = vl
    .markBar({ cornerRadiusTopLeft: 2, cornerRadiusTopRight: 2 })
    .data(filtered)
    .transform(
      vl.aggregate([{ op: "sum", field: "Global_Sales", as: "TotalSales" }])
        .groupby(["Genre", "Platform"])
    )
    .encode(
      vl.x().fieldN("Genre")                                   // one group per Genre
        .title("Genre")
        .sort({ field: "TotalSales", op: "sum", order: "descending" }),
      vl.y().fieldQ("TotalSales")                               // bar height = total global sales
        .title("Sum of Global Sales (millions)"),
      vl.xOffset().fieldN("Platform"),                          // grouped bars by Platform
      vl.color().fieldN("Platform")                             // color by Platform (legend)
        .title("Platform")
        .scale({ scheme: "pastel1" }),
      vl.tooltip([
        { field: "Genre", type: "nominal" },
        { field: "Platform", type: "nominal" },
        { field: "TotalSales", type: "quantitative", title: "Global Sales (M)", format: ".1f" }
      ])
    )
    .width("container")
    .height(320)

    .title({
      text: `Global Sales by Genre & Platform (Grouped: Top 5 Platforms)`,
      subtitle: `Platforms shown: ${topPlatforms.join(", ")}`,
      anchor: "start",
      fontSize: 18,
      subtitleFontSize: 12,
      subtitleColor: "white",
      titleColor: "white"
    })
    
    
    .config({
      background: "transparent",       
      view: { stroke: "transparent" },

      axis: {
       labelFontSize: 11,
       titleFontSize: 12,
       labelColor: "white",            // <— make axis labels white
       titleColor: "white",            // <— make axis titles white
       grid: false,
       tickSize: 0,
       domain: false
      },

      legend: {
        labelFontSize: 11,
        titleFontSize: 12,
        labelColor: "white",            
        titleColor: "white",            
        orient: "right"
      },

      title: { color: "white" }         
      
    })
    .toSpec();

  await render("#view", spec);
});

// Embed helper from your starter
async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec, { actions: false });
  result.view.run();
}
