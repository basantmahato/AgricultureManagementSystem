import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { getMongoUri } from "./loadEnv.js";
import Blog from "./models/Blog.js";

function isMainModule() {
  const thisFile = fileURLToPath(import.meta.url);
  const entry = process.argv[1];
  return Boolean(entry && path.resolve(entry) === path.resolve(thisFile));
}

const posts = [
  {
    slug: "sustainable-farming-practices-2025",
    title: "Sustainable Farming Practices for 2025",
    excerpt:
      "Discover eco-friendly techniques that reduce chemical use while maintaining high yields. Learn about crop rotation, organic fertilizers, and integrated pest management.",
    category: "Sustainable Farming",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80",
    publishedAt: new Date("2025-02-15"),
    readTimeMinutes: 7,
    body: `Sustainable farming is no longer optional for many regions facing soil fatigue, water stress, and input cost volatility. The goal is simple: maintain or improve yields while reducing environmental harm and building long-term farm resilience.

Crop rotation is one of the oldest and still most effective tools. Alternating cereals with legumes, for example, can fix atmospheric nitrogen, break pathogen cycles, and improve soil structure. Even a two-year rotation beats continuous monocropping for pest pressure and nutrient balance.

Organic matter management deserves equal attention. Compost, farmyard manure, and green manures feed soil microbes that unlock nutrients and improve water-holding capacity. Combined with careful tillage—reducing passes where possible—you protect aggregation and cut fuel use.

Integrated Pest Management (IPM) means scouting fields regularly, using economic thresholds before spraying, and favouring biological controls and targeted chemistry when intervention is justified. Digital tools and simple trap counts can help smallholders make timely decisions.

Finally, record-keeping ties it together. Track inputs, yields, and soil tests year on year. Patterns emerge: which blocks respond to which practices, and where money is best spent. In 2025, the farms that treat sustainability as a system—not a slogan—will be the most adaptable.`
  },
  {
    slug: "soil-health-why-it-matters",
    title: "Soil Health: Why It Matters for Your Crops",
    excerpt:
      "Healthy soil is the foundation of a successful farm. Understand pH levels, nutrient balance, and how to improve soil structure for better harvests.",
    category: "Soil Science",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    publishedAt: new Date("2025-02-10"),
    readTimeMinutes: 6,
    body: `Soil is a living system—not just dirt. Its physical structure, chemical balance, and biological activity together determine how well roots explore the profile and access water and nutrients.

pH is often the first lever. Most field crops do best in a slightly acidic to neutral band; extremes lock up phosphorus, manganese, or micronutrients. A reliable soil test every two to three years, paired with targeted lime or sulphur where needed, prevents guesswork.

Macronutrients—nitrogen, phosphorus, potassium—get most of the attention, but secondary and micronutrients matter too, especially in intensively cropped land. Leaf symptoms can hint at shortages, but tissue or soil testing confirms before you spend.

Compaction silently limits yields. Heavy machinery on wet soils squeezes pores and restricts rooting depth. Controlled traffic, lighter loads when possible, and cover crops with strong taproots can gradually rebuild structure.

Organic matter is the glue that holds it all together. It buffers against drought and excess rain, feeds microbes, and stabilises aggregates. Whether you add compost, incorporate residues, or plant cover crops, the trend line matters more than any single season.

Investing in soil health pays back in fewer emergencies, more stable yields, and often lower input bills over time.`
  },
  {
    slug: "irrigation-methods-indian-farms",
    title: "Best Irrigation Methods for Indian Farms",
    excerpt:
      "From drip irrigation to sprinklers, compare water-saving techniques suitable for different crops and regions. Maximize yield while conserving water.",
    category: "Irrigation",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    publishedAt: new Date("2025-02-05"),
    readTimeMinutes: 8,
    body: `Water is often the binding constraint across India’s diverse agro-climates. Choosing the right delivery method can raise water-use efficiency, reduce pumping costs, and protect soil from erosion or salinity.

Surface irrigation—borders, basins, furrows—remains common where land is level and water is abundant. It is cheap to implement but wasteful if not managed; levelling fields and shortening runs improves uniformity.

Sprinklers suit many cereals and forages on moderate slopes. Impact and gear-drive systems are robust; centre pivots work at scale where fields are large and square. Wind drift and evaporation losses are real, so timing irrigation for calm periods helps.

Drip and micro-sprinklers shine in horticulture: vegetables, orchards, and high-value crops. Water goes to the root zone with minimal waste; fertigation becomes practical. Upfront cost is higher, but payback can be fast where water tariffs or scarcity bite.

Scheduling beats hardware alone. Soil moisture sensors, pan evaporation estimates, or even simple feel-and-appearance methods beat fixed calendars. Aligning irrigation with crop stage—especially flowering and grain fill—stretches every litre.

In water-stressed blocks, mulching, residue retention, and crop choice (deep-rooted species where appropriate) complement hardware. The best system is the one your farm can operate consistently and measure.`
  },
  {
    slug: "crop-selection-this-season",
    title: "Crop Selection Guide: What to Plant This Season",
    excerpt:
      "Seasonal recommendations for wheat, rice, pulses, and vegetables. Climate considerations and market demand insights for smart planting decisions.",
    category: "Crops",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80",
    publishedAt: new Date("2025-01-28"),
    readTimeMinutes: 7,
    body: `Choosing what to plant is a bet on weather, water, labour, and markets—all at once. A structured approach reduces nasty surprises.

Start with agro-climatic fit. Heat units, frost risk, and monsoon timing should match the crop’s phenology. Variety selection within the crop matters: shorter-duration varieties can dodge terminal heat or free land for the next crop.

Water and soil set hard limits. Heavy soils suit rice in many regions; lighter, well-drained plots may favour vegetables or pulses. Don’t fight the land every year—rotate toward what it carries well.

Market signals help but shouldn’t be the only input. Local mandi trends, storage availability, and transport costs affect net returns. Sometimes a slightly lower-price crop with reliable demand and lower risk beats a speculative spike crop.

Diversification spreads risk. If you can split acreage across two or three enterprises—say cereal plus pulse plus a cash vegetable—you buffer weather and price shocks.

Finally, leave margin for contingencies: seed failure, delayed rains, or labour bottlenecks at harvest. A plan B crop or adjusted sowing window, thought through in advance, saves panic later.`
  },
  {
    slug: "farm-equipment-maintenance",
    title: "Farm Equipment Maintenance Tips",
    excerpt:
      "Extend the life of your tractors, ploughs, and pumps. Routine checks, lubrication schedules, and common repairs every farmer should know.",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    publishedAt: new Date("2025-01-20"),
    readTimeMinutes: 6,
    body: `Downtime during peak tillage or harvest is expensive. A disciplined maintenance habit turns equipment from a liability into a reliable asset.

Follow the manufacturer’s schedule for engine oil, filters, and coolant. Skipping oil changes saves little and risks bearings and rings. Keep air filters clean—dusty conditions clog them fast and choke engines.

Hydraulic systems need clean oil and intact hoses. Inspect for leaks before busy seasons; a blown hose in the field costs hours. Grease points on implements according to hours used, not calendar time alone.

Belts, chains, and bearings on implements wear predictably. Replace before failure when you see cracks, play, or noise. Keep a small stock of critical spares for your most-used machines.

Electrical systems corrode and loosen. Check battery terminals, starter connections, and lighting before night work.

Finally, store equipment under cover when possible, and run engines periodically in the off-season. A machine that starts clean and cool is more likely to finish the job when the weather window is tight.`
  },
  {
    slug: "weather-based-farming",
    title: "Weather-Based Farming: Plan Ahead",
    excerpt:
      "Use weather forecasts to schedule planting, irrigation, and harvesting. Avoid losses from unexpected rains, frost, or droughts.",
    category: "Weather",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    publishedAt: new Date("2025-01-12"),
    readTimeMinutes: 5,
    body: `Weather drives almost every field decision. Short- and medium-range forecasts won’t be perfect, but using them deliberately still beats acting blind.

Before planting, watch soil temperature and moisture—not just calendar dates. A warm spell followed by frost can wipe a stand; conversely, delayed sowing may expose the crop to heat at flowering.

For sprays, wind speed and incoming rain matter as much as pest thresholds. Many labels specify conditions; ignoring them risks drift, wash-off, and wasted product.

Irrigation scheduling should incorporate rainfall probability. If heavy rain is likely, delay irrigation to avoid leaching and waterlogging.

At harvest, grain moisture and storm risk decide the window. Pushing for maximum dry-down can backfire if a cyclone or prolonged rain is forecast.

Keep a simple log: what you observed versus what happened. Over seasons, you’ll calibrate local patterns—when your block tends to get fog, wind, or early monsoon onset—and that intuition, combined with forecasts, is powerful.`
  },
  {
    slug: "composting-on-farm-scale",
    title: "Composting at Farm Scale: A Practical Guide",
    excerpt:
      "Turn crop residues and manure into stable compost. C:N ratios, turning schedules, and how to avoid odours and pathogens.",
    category: "Soil Science",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80",
    publishedAt: new Date("2025-01-08"),
    readTimeMinutes: 6,
    body: `Composting converts organic waste into a stable soil amendment. At farm scale, windrows or static piles are common; the key is balancing carbon-rich materials (straw, stalks) with nitrogen-rich inputs (manure, legume trimmings) for a C:N near 25–35:1.

Moisture should feel like a wrung-out sponge; too dry and decomposition stalls, too wet and anaerobic pockets smell. Turn windrows weekly during active phases to reintroduce oxygen and even out temperature.

Finished compost should be dark, crumbly, and cool in the centre. Screen if you need uniform particle size for nurseries or precision application. Applied at 5–10 t/ha before planting, it feeds biology and improves water retention—especially on sandy or degraded blocks.`
  },
  {
    slug: "natural-enemies-pest-control",
    title: "Natural Enemies: Working With Beneficial Insects",
    excerpt:
      "Parasitoids, predators, and pollinators—how to conserve them and when biocontrol complements sprays in field crops.",
    category: "Sustainable Farming",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80",
    publishedAt: new Date("2024-12-20"),
    readTimeMinutes: 7,
    body: `Beneficial insects often suppress pests for free if habitat and sprays allow them to survive. Parasitic wasps attack caterpillar and aphid pests; ladybirds and lacewings consume soft-bodied insects; ground beetles patrol the soil surface.

Broad-spectrum insecticides can crash these populations faster than pests rebound. Where possible, use selective chemistry, lower rates, and spot treatments. Flower strips and uncultivated margins provide nectar for adults of many parasitoids.

Scouting remains essential: biocontrol rarely eliminates every pest, but it can keep populations below economic thresholds when combined with rotation and resistant varieties.`
  },
  {
    slug: "cover-crops-rotation",
    title: "Cover Crops Between Seasons",
    excerpt:
      "Legumes, grasses, and mixes—what to plant after harvest to protect soil, fix nitrogen, and prepare the next cash crop.",
    category: "Crops",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
    publishedAt: new Date("2024-12-12"),
    readTimeMinutes: 6,
    body: `A short window between crops is enough for a cover if you choose the right species and manage termination. Legumes like berseem or sunn hemp can fix N for the following cereal; grasses build biomass and scavenge leftover nutrients.

Terminate covers before they set copious seed unless you want a volunteer problem. Rolling, mowing, or shallow incorporation works depending on your next crop and tillage plan.

In dry regions, prioritize water use: a low-biomass legume may beat a thirsty grass. Track biomass produced and soil cover percentage—the goal is living roots in the ground for as long as your rotation allows.`
  },
  {
    slug: "rainwater-harvesting-fields",
    title: "Rainwater Harvesting for Field Crops",
    excerpt:
      "Farm ponds, bunds, and recharge pits—capturing runoff without drowning low fields.",
    category: "Irrigation",
    image: "https://images.unsplash.com/photo-1432405972618-c60b022a4012?w=1200&q=80",
    publishedAt: new Date("2024-12-01"),
    readTimeMinutes: 8,
    body: `Storing runoff in farm ponds can buffer dry spells and support supplemental irrigation. Site ponds where soils hold water and spillways are stable; line or compact if seepage is excessive.

Contour bunds and graded channels slow water across slopes, giving infiltration time and reducing gully erosion. In heavy monsoon years, overflow paths must be clear or you risk breaching.

Match storage to realistic command area and pumping head—oversized ponds tie up land and may stagnate. Combine with good soil organic matter so every millimetre of rain that stays in the profile counts.`
  },
  {
    slug: "soil-testing-how-often",
    title: "How Often Should You Soil Test?",
    excerpt:
      "Sampling depth, grid vs zone, and interpreting trends—not just a single snapshot number.",
    category: "Soil Science",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&q=80",
    publishedAt: new Date("2024-11-22"),
    readTimeMinutes: 5,
    body: `Most farms benefit from a full soil test every two to three years on representative fields, or more often if cropping intensity or amendments change rapidly. Sample at consistent depth—usually 0–15 cm for nutrients tied to the plough layer.

Zone sampling by management blocks beats random grabs if your farm has clear soil or yield patterns. GPS-marked points help you resample the same zones next cycle and see trends.

Use results to adjust lime, P, K, and micronutrients—not as a reason to load every element every year. Build a simple spreadsheet: date, block, pH, organic matter, and key nutrients. Trends beat single points.`
  },
  {
    slug: "tractor-safety-checklist",
    title: "Tractor Safety Before Every Shift",
    excerpt:
      "PTO guards, brakes, ROPS, and field visibility—quick checks that prevent serious injury during busy seasons.",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80",
    publishedAt: new Date("2024-11-15"),
    readTimeMinutes: 4,
    body: `Rollover protection and seat belts save lives when slopes and headlands bite. Check ROPS mounting bolts and belt condition before peak tillage.

Walk around for leaking hydraulics, damaged tyres, and loose linkage pins. PTO shafts must be shielded; loose clothing and PTOs are a lethal combination.

Keep lights and flashers working for road moves, and never carry extra riders on fenders or hitches. Five minutes of inspection beats weeks of recovery from a preventable incident.`
  },
  {
    slug: "direct-marketing-produce",
    title: "Selling Direct: Farm Gates and Local Markets",
    excerpt:
      "Pricing, grading, and building repeat customers when you skip the mandi middle.",
    category: "Crops",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    publishedAt: new Date("2024-11-08"),
    readTimeMinutes: 6,
    body: `Direct sales can capture more margin but add logistics and service expectations. Start with a consistent grade: size bands, visible defects policy, and clean packaging.

Price against retail minus a fair discount for bulk or loyalty, not only against wholesale mandi rates. Social messaging and simple pre-orders reduce waste and help you harvest to demand.

Track what sells each week; rotate varieties toward what your local buyers want. Reliability—same quality every Friday—builds word of mouth faster than occasional perfection.`
  },
  {
    slug: "mulching-vegetables",
    title: "Plastic and Organic Mulch in Vegetables",
    excerpt:
      "When each method wins, installation tips, and end-of-season disposal.",
    category: "Sustainable Farming",
    image: "https://images.unsplash.com/photo-1592419044703-3972b3f7b0ff?w=1200&q=80",
    publishedAt: new Date("2024-10-30"),
    readTimeMinutes: 5,
    body: `Plastic mulch warms beds, suppresses weeds, and reduces evaporation—ideal for transplanted tomatoes and capsicum in cool starts. Buried drip lines under film work well; watch emitter clogging with hard water.

Straw or leaf mulch suits wider rows and organic systems but can harbour slugs in wet weather—monitor and adjust thickness.

Remove and dispose of plastic responsibly; fragmenting film in soil is a long-term problem. For organic mulch, incorporate or compost at season end to feed the next rotation.`
  }
];

export async function seedBlog(options = {}) {
  const force = Boolean(options.force);
  if (force) {
    const { deletedCount } = await Blog.deleteMany({});
    console.log(`Blog: removed ${deletedCount} existing documents`);
  } else {
    const count = await Blog.countDocuments();
    if (count > 0) {
      console.log("Blog: collection not empty, skipping (use --force or seed:all --force to replace)");
      return;
    }
  }
  await Blog.insertMany(posts);
  console.log("Blog: inserted", posts.length, "posts");
}

async function runCli() {
  const mongoUri = getMongoUri();
  if (!mongoUri) {
    console.error("Set MONGO_URI or MONGODB_URI in backend/.env");
    process.exit(1);
  }
  const force = process.argv.includes("--force");
  await mongoose.connect(mongoUri);
  await seedBlog({ force });
  await mongoose.disconnect();
  process.exit(0);
}

if (isMainModule()) {
  runCli().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
