export const content = {
    hero: {
        subtitle: "Mechanical Design Portfolio",
        title: "Precision in",
        titleSpan: "Every Dimension.",
        bio: "I am a **Mechanical Design Engineer** specializing in **EV Thermal Management**, **Computational Fluid Dynamics**, and **Driveline Integration**. My work bridges the gap between conceptual **CAD design** and rigorous **ISO-certified validation** across Automotive, Defence, and Manufacturing sectors.",
        profileImage: "profile.jpg"
    },
    bio: {
        subtitle: "Biography",
        title: "The Engineer Behind the Design",
        text1: "Engineering is the art of balancing the theoretical with the tangible. With a robust foundation in **Mechanical Engineering** and a specialization in **Automotive Systems**, I approach design not as a linear process, but as an iterative cycle of validation.",
        text2: "My expertise lies in the \"Hot and Heavy\" sectors of EV development: **Thermal Management** and **Driveline Fabrication**. Whether it's redesigning a water-glycol cooling circuit to squeeze out an extra **14% efficiency** or running topological optimization to shave grams off a gearbox housing, I am driven by data. My experience spans from the R&D labs of **Switch Mobility** to the precision manufacturing floors of **Gajra Gears**."
    },
    quote: {
        text: "\"Engineering is the art of balancing physical constraints with digital possibilities. With a foundation in SolidWorks, Siemens NX, and Ansys Fluent, I don't just design components, I orchestrate systems. From optimizing coolant flow in heavy-duty electric buses to refining transmission topology, I apply DFMA principles to ensure every micron matters.\""
    },
    competencies: [
        {
            icon: "fa-drafting-compass",
            title: "Mechanical & Product Design",
            items: ["Component & Enclosure Design", "Driveline/Transmission Systems", "DFM/DFMA & GD&T", "Six Sigma (Green Belt)", "Validation and Testing"]
        },
        {
            icon: "fa-sync-alt",
            title: "Product Development",
            items: ["New Product Introduction (NPI)", "Concept to Product Launch", "PLM (Teamcenter, Windchill)", "APQP & Design Release", "Technical Documentation"]
        },
        {
            icon: "fa-wind",
            title: "Simulation & Validation",
            items: ["FEA (Stress/Fatigue/Durability)", "CFD/Thermal Analysis (Fluent)", "DFMEA & Root-Cause", "ISO & Safety Compliance"]
        },
        {
            icon: "fa-laptop-code",
            title: "CAD & Data Tools",
            items: ["SolidWorks & PDM", "Siemens NX, Catia 3DX", "Statistical Analysis", "Change Management (CR/CN)"]
        },
        {
            icon: "fa-industry",
            title: "Manufacturing",
            items: ["Process Support", "Supplier Quality Assurance", "Cost Reduction Strategies", "Continuous Improvement"]
        }
    ],
    software: [
        { icon: "fa-cube", name: "SolidWorks" },
        { icon: "fa-fighter-jet", name: "Catia" },
        { icon: "fa-layer-group", name: "Siemens NX" },
        { icon: "fa-cogs", name: "PTC Creo" },
        { icon: "fa-tools", name: "Autodesk Inventor" },
        { icon: "fa-drafting-compass", name: "Autodesk AutoCAD" },
        { icon: "fa-project-diagram", name: "Altair HyperWorks" },
        { icon: "fa-mesh", name: "HyperMesh" },
        { icon: "fa-flask", name: "Ansys Workbench" },
        { icon: "fa-wind", name: "Ansys Fluent" },
        { icon: "fa-code-branch", name: "Abaqus" },
        { icon: "fa-calculator", name: "Matlab" },
        { icon: "fa-network-wired", name: "Siemens Teamcenter" },
        { icon: "fa-sitemap", name: "PTC Windchill" },
        { icon: "fa-car-battery", name: "CANalyzer" }
    ],
    projects: [
        {
            subtitle: "Switch Mobility Ltd.",
            title: "ODIN E1: BTMS Architecture",
            narrative: [
                "As the Lead Design Engineer for the ODIN E1 platform, I held full ownership of the **Battery Thermal Management System (BTMS)**. This project demanded a synthesis of high-level CAD design and deep thermodynamic analysis. I designed the modular battery cradle using **SolidWorks** and **Stainless Steel 1.4003**, selected for its optimal balance of corrosion resistance and structural damping properties needed to survive the harsh **ISO 16750** vibration profiles of heavy-duty transit.",
                "The critical challenge was achieving uniform thermal regulation across the distributed 7-pack configuration. Initial prototypes revealed significant thermal gradients. Leveraging **Ansys Fluent** for Phase 2 CFD analysis, I modeled the coolant flow dynamics and identified pressure drop zones. By iteratively optimizing the inlet orifice diameters, I balanced the hydraulic resistance of the parallel circuits. The result was a verified pump flow rate of **57 L/min** and a temperature variance of less than **3°C** across all modules under peak load."
            ],
            specs: [
                { label: "Material", value: "SS 1.4003 Ferritic" },
                { label: "Validation", value: "CFD Phase 2 / ISO 16750" },
                { label: "Flow Rate", value: "57 L/min" }
            ],
            images: [
                { id: "p1_draw", name: "odin_cradle.jpg", caption: "CRADLE DRAWING", icon: "fa-pen-ruler" },
                { id: "p1_cfd", name: "odin_cfd.jpg", caption: "CFD HEATMAP", icon: "fa-wind" }
            ],
            reverse: false
        },
        {
            subtitle: "Systems Integration",
            title: "Logic & Simulation",
            narrative: [
                "Bridging the mechanical-software divide, I validated the **BMS Logic** for the ODIN 4.5 release. Utilizing **PCAN Explorer** to interface with the J1939 CAN bus, I logged real-time data to verify that thermal triggers—active cooling, heating, and standby modes—actuated correctly based on cell temperature thresholds. This validation was crucial for **ISO 26262** functional safety compliance.",
                "Additionally, I modeled the kinematics of the Steering Box relative to suspension travel to eliminate bump steer. I also performed detailed calculations to determine the specific spring rate (13.52 N/mm) required for the AC Belt Tensioner, preventing slippage under peak torque loads of 110Nm."
            ],
            specs: [], // No specs grid in this one
            images: [
                { id: "p2_logic", name: "bms_logic.jpg", caption: "BMS LOGIC", icon: "fa-microchip" }
            ],
            reverse: true
        },
        {
            subtitle: "Manufacturing",
            title: "Fabrication & DFM",
            narrative: [
                "At BJS Fabrications, I led an initiative to standardize sheet metal enclosures through strict **Design for Manufacturing (DFM)** protocols. By analyzing the fabrication workflow, I simplified complex weldments and optimized bend radii for standard tooling. This collaboration with the shop floor reduced raw material wastage and lowered overall production costs by a confirmed **8%**."
            ],
            images: [
                { id: "p3_fab", name: "fabrication.jpg", caption: "FABRICATION RENDER", icon: "fa-industry" }
            ],
            reverse: false
        },
        {
            subtitle: "Computational Design",
            title: "Topology & Lightweighting",
            narrative: [
                "At Gajra Gears, I utilized **PTC Creo's Topology Optimization** suite to redesign cast aluminum gearbox housings (A356-T6). By defining load paths and constraints, I mathematically removed non-structural mass, achieving a **12% weight reduction** without compromising stress distribution. This approach is essential for modern defence and automotive applications where weight efficiency translates directly to performance."
            ],
            images: [
                { id: "p4_opt", name: "topology.jpg", caption: "TOPOLOGY OPTIMIZATION", icon: "fa-cogs" }
            ],
            reverse: true
        }
    ],
    research: [
        {
            title: "Automotive Chassis Engineering",
            subtitle: "MECH 5185M | Suspension & Steering",
            text: "Performed a complete elasto-kinematic analysis of a vehicle chassis. Calculated spring rates (Front: 16 N/mm, Rear: 35 N/mm) and damper sizing. Optimized Ackermann steering geometry to minimize tyre scrub torque (~103 Nm) and validated steady-state cornering load transfers using MATLAB models.",
            image: "res_chassis.jpg",
            icon: "fa-car-side"
        },
        {
            title: "Advanced FEA: Door Seal",
            subtitle: "MECH 5680M | Hyperelastic Simulation",
            text: "Conducted non-linear FEA of an EPDM door seal using Abaqus Explicit. Characterized hyperelastic material behaviour using Mooney-Rivlin and Arruda-Boyce models. Simulated complex contact pressure and Compression Load Deflection (CLD) to optimize sealing efficiency and minimize door closing effort (92N).",
            image: "res_seal.jpg",
            icon: "fa-file-pdf"
        },
        {
            title: "Autonomous Pod Powertrain",
            subtitle: "MECH 5880M | Team Design",
            text: "Lead Powertrain Engineer for a Level 5 Connected Autonomous Vehicle (CAV). Engineered a **31.49 kWh liquid-cooled battery pack**. The design achieved a packaging efficiency of 3.31 m³ by optimizing module arrangement. Conducted thermal calculations to ensure cell temperatures remained under 35°C. Energy efficiency of **244.59 Wh/km**.",
            image: "res_pod.jpg",
            icon: "fa-battery-full"
        },
        {
            title: "Transient Thermal FEA",
            subtitle: "MSc Thesis",
            text: "Developed a transient FEA model in **Abaqus** to simulate heat generation in carbon-ceramic disc brakes (0-600°C). By iteratively optimizing the cooling vane geometry, I increased airflow velocity, resulting in an **8% reduction in peak surface temperatures**.",
            image: "res_thermal.jpg",
            icon: "fa-fire"
        },
        {
            title: "Formula E Transmission",
            subtitle: "MECH 5125M | Driveline",
            text: "Designed a high-performance single-speed transmission for 900Nm torque. Performed Hertzian contact stress calculations and casing topology optimization.",
            image: "res_trans.jpg",
            icon: "fa-cog"
        },
        {
            title: "McLaren F1 Analysis",
            subtitle: "MECH 3470 | Vehicle Design",
            text: "Forensic engineering analysis of double-wishbone suspension kinematics and central seating position's effect on CG and handling.",
            image: "res_mclaren.jpg",
            icon: "fa-flag-checkered"
        }
    ]
};
