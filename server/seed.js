import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Job from "./models/Job.js";
import Proposal from "./models/Proposel.js";
import Contract from "./models/Contract.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Job.deleteMany({});
    await Proposal.deleteMany({});
    await Contract.deleteMany({});
    console.log("✅ Data cleared");

    // Create Users
    console.log("👥 Creating users...");
    
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Clients
    const client1 = await User.create({
      firstName: "John",
      lastName: "Smith",
      email: "client1@demo.com",
      password: hashedPassword,
      role: "client",
      companyName: "Tech Solutions Inc.",
      tokens: 100,
    });

    const client2 = await User.create({
      firstName: "Sarah",
      lastName: "Johnson",
      email: "client2@demo.com",
      password: hashedPassword,
      role: "client",
      companyName: "Digital Agency Co.",
      tokens: 150,
    });

    // Freelancers
    const freelancer1 = await User.create({
      firstName: "Mike",
      lastName: "Developer",
      email: "freelancer1@demo.com",
      password: hashedPassword,
      role: "freelancer",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      experienceLevel: "senior",
      rating: 4.8,
      tokens: 50,
      portfolio: [
        {
          title: "E-commerce Platform",
          description: "Built a full-stack e-commerce solution",
          link: "https://example.com/portfolio1",
        },
        {
          title: "Social Media Dashboard",
          description: "Created analytics dashboard with React",
          link: "https://example.com/portfolio2"
        },
      ],
    });

    const freelancer2 = await User.create({
      firstName: "Emma",
      lastName: "Designer",
      email: "freelancer2@demo.com",
      password: hashedPassword,
      role: "freelancer",
      skills: ["UI/UX Design", "Figma", "Adobe XD", "React"],
      experienceLevel: "mid",
      rating: 4.5,
      tokens: 30,
      portfolio: [
        {
          title: "Mobile App Design",
          description: "Designed complete mobile app UI",
          link: "https://example.com/portfolio3"
        },
      ],
    });

    const freelancer3 = await User.create({
      firstName: "David",
      lastName: "DataScientist",
      email: "freelancer3@demo.com",
      password: hashedPassword,
      role: "freelancer",
      skills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
      experienceLevel: "senior",
      rating: 4.9,
      tokens: 75,
    });

    console.log("✅ Created 5 users (2 clients, 3 freelancers)");

    // Create Jobs
    console.log("💼 Creating jobs...");

    const job1 = await Job.create({
      jobTitle: "Build a React Dashboard",
      description:
        "We need an experienced React developer to build a modern admin dashboard with charts, tables, and user management. Must have experience with React, Redux, and Chart.js.",
      budget: 1500,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: "pending",
      client: client1._id,
    });

    const job2 = await Job.create({
      jobTitle: "Mobile App UI/UX Design",
      description:
        "Looking for a talented designer to create UI/UX designs for a fitness tracking mobile app. Need wireframes, mockups, and prototypes.",
      budget: 800,
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
      status: "pending",
      client: client1._id,
    });

    const job3 = await Job.create({
      jobTitle: "Data Analysis & Visualization",
      description:
        "Need a data scientist to analyze sales data and create visualizations. Python, Pandas, and Matplotlib experience required.",
      budget: 1200,
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      status: "pending",
      client: client2._id,
    });

    const job4 = await Job.create({
      jobTitle: "E-commerce Website Development",
      description:
        "Build a complete e-commerce website with product listings, shopping cart, and payment integration. MERN stack preferred.",
      budget: 3000,
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
      status: "pending",
      client: client2._id,
    });

    const job5 = await Job.create({
      jobTitle: "API Development for Mobile App",
      description:
        "Develop RESTful API with Node.js and Express for a mobile application. Must include authentication, database design, and documentation.",
      budget: 2000,
      deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
      status: "selected",
      client: client1._id,
      freelancer: freelancer1._id,
    });

    console.log("✅ Created 5 jobs");

    // Create Proposals
    console.log("📨 Creating proposals...");

    const proposal1 = await Proposal.create({
      job: job1._id,
      freelancer: freelancer1._id,
      client: client1._id,
      coverLetter:
        "Hello! I have 5+ years of experience building React dashboards. I've worked with Redux, Chart.js, and modern React patterns. I can deliver this project within your timeline with high quality code. Check out my portfolio for similar projects!",
      proposedAmount: 1400,
      status: "pending",
    });

    const proposal2 = await Proposal.create({
      job: job2._id,
      freelancer: freelancer2._id,
      client: client1._id,
      coverLetter:
        "Hi! I'm a UI/UX designer with experience in mobile app design. I can create beautiful, user-friendly designs for your fitness app. My process includes research, wireframing, and interactive prototypes.",
      proposedAmount: 750,
      status: "pending",
    });

    const proposal3 = await Proposal.create({
      job: job3._id,
      freelancer: freelancer3._id,
      client: client2._id,
      coverLetter:
        "Greetings! I'm a data scientist specializing in sales analytics. I'll provide comprehensive analysis with clear visualizations using Python, Pandas, and Matplotlib. I can also provide insights and recommendations.",
      proposedAmount: 1100,
      status: "pending",
    });

    const proposal4 = await Proposal.create({
      job: job4._id,
      freelancer: freelancer1._id,
      client: client2._id,
      coverLetter:
        "I'm interested in building your e-commerce platform. I have extensive experience with MERN stack and have built similar platforms before. I can integrate payment gateways like Stripe or PayPal.",
      proposedAmount: 2800,
      status: "pending",
    });

    const proposal5 = await Proposal.create({
      job: job5._id,
      freelancer: freelancer1._id,
      client: client1._id,
      coverLetter:
        "Perfect project for me! I specialize in API development with Node.js and Express. I'll create a secure, scalable API with complete documentation and testing.",
      proposedAmount: 1900,
      status: "accepted",
    });

    console.log("✅ Created 5 proposals");

    // Create Contracts
    console.log("📄 Creating contracts...");

    const contract1 = await Contract.create({
      job: job5._id,
      freelancer: freelancer1._id,
      client: client1._id,
      start_dt: new Date(),
      etat: "active",
    });

    console.log("✅ Created 1 active contract");

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("🎉 DATABASE SEEDED SUCCESSFULLY!");
    console.log("=".repeat(50));
    console.log("\n📊 DEMO ACCOUNTS:");
    console.log("\n👔 CLIENTS:");
    console.log("   Email: client1@demo.com");
    console.log("   Password: password123");
    console.log("   Company: Tech Solutions Inc.");
    console.log("");
    console.log("   Email: client2@demo.com");
    console.log("   Password: password123");
    console.log("   Company: Digital Agency Co.");
    console.log("\n💼 FREELANCERS:");
    console.log("   Email: freelancer1@demo.com");
    console.log("   Password: password123");
    console.log("   Skills: React, Node.js, MongoDB, Express (Senior)");
    console.log("");
    console.log("   Email: freelancer2@demo.com");
    console.log("   Password: password123");
    console.log("   Skills: UI/UX Design, Figma, Adobe XD, React (Mid-level)");
    console.log("");
    console.log("   Email: freelancer3@demo.com");
    console.log("   Password: password123");
    console.log("   Skills: Python, Machine Learning, Data Analysis (Senior)");
    console.log("\n💼 JOBS CREATED: 5 jobs");
    console.log("📨 PROPOSALS CREATED: 5 proposals");
    console.log("📄 CONTRACTS CREATED: 1 active contract");
    console.log("\n" + "=".repeat(50));
    console.log("✅ You can now login and see the data!");
    console.log("=".repeat(50) + "\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
