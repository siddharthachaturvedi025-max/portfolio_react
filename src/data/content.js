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
                "As the Lead Design Engineer for the ODIN E1 platform at **Switch Mobility**, I held full product ownership of the **Battery Thermal Management System (BTMS)** and EDU components. This demanding role required me to utilize agile skeleton models in **CATIA** and **Siemens NX** to define system architecture, ensure geometric compatibility across subsystems, and meet all critical R&D performance indicators (KPIs) through structured programme gateways.",
                "I designed the modular battery cradle and HV enclosures using rigorous **GD&T** principles (**BS8888/ASME Y14.5**), creating detailed assembly models and technical drawings for manufacture. Material selection of **Stainless Steel 1.4003** was critical—offering an optimal balance of corrosion resistance and structural damping properties essential for surviving the harsh **ISO 16750-3** vibration profiles of heavy-duty electric transit applications.",
                "The critical challenge was achieving uniform thermal regulation across the distributed 9-pack configuration. Initial prototype testing revealed significant thermal gradients and flow imbalances. Leveraging **Ansys Fluent CFD** analysis, I modeled the complete water-glycol coolant flow dynamics, identified pressure drop zones, and optimized seal designs with **HAZOP risk mitigation** protocols. By iteratively refining inlet orifice diameters and fluid paths, I achieved a verified **14% efficiency gain**, balancing hydraulic resistance across parallel circuits. Physical validation confirmed a pump flow rate of **57 L/min** and temperature variance of less than **3°C** across all modules under peak thermal load.",
                "Beyond thermal design, I spearheaded **FEA-driven structural analysis** to balance weight optimization, NVH requirements, and crash safety for full homologation compliance. I also contributed to modular ePowertrain packaging by designing optimized liquid-cooled compressor housings and inverter plates, ensuring seamless serviceability for both commercial and passenger EV platforms."
            ],
            specs: [
                { label: "Material", value: "SS 1.4003 Ferritic" },
                { label: "Efficiency Gain", value: "14% CFD Validated" },
                { label: "Validation", value: "ISO 16750-3 / HAZOP" }
            ],
            images: [
                {
                    id: "p1_draw",
                    names: ["odin_cradle.jpg"], // Can add up to 6: odin_cradle_2.jpg, ..., odin_cradle_6.jpg
                    caption: "CRADLE DRAWING",
                    icon: "fa-pen-ruler"
                },
                {
                    id: "p1_cfd",
                    names: ["odin_cfd.jpg"], // Can add up to 6: odin_cfd_2.jpg, ..., odin_cfd_6.jpg
                    caption: "CFD HEATMAP",
                    icon: "fa-wind"
                }
            ],
            reverse: false
        },
        {
            subtitle: "Systems Integration",
            title: "Logic & Simulation",
            narrative: [
                "Engineering excellence demands more than isolated component design—it requires holistic systems integration. Throughout my work at **Switch Mobility**, I served as a critical arbitration point between disciplines, resolving complex integration issues through formal technical design reviews, JIRA backlog management, and agile methodologies to achieve all design freezes and project milestones.",
                "Bridging the mechanical-software divide, I validated **BMS Logic** for the ODIN platform releases. Utilizing **PCAN Explorer** and diagnostic tools to interface with the **J1939 CAN bus**, I logged real-time thermal data to verify that cooling triggers—active cooling, heating, and standby modes—actuated correctly based on precise cell temperature thresholds. This comprehensive validation was essential for **ISO 26262** functional safety compliance and ensured flawless integration with vehicle control systems.",
                "I supported prototype builds and virtual validation events, collaborating with cross-functional teams to troubleshoot legacy cooling system issues and enhance reliability. My work extended product lifecycle performance through meticulous thermal design reviews and rigorous testing protocols. Additionally, I modeled suspension and driveline kinematics, performed detailed spring rate calculations (13.52 N/mm for AC Belt Tensioner), and validated structural integrity to prevent component failure under dynamic loads exceeding 110Nm."
            ],
            specs: [], // No specs grid in this one
            images: [
                {
                    id: "p2_logic",
                    names: ["bms_logic.jpg"],
                    caption: "BMS LOGIC",
                    icon: "fa-microchip"
                }
            ],
            reverse: true
        },
        {
            subtitle: "Manufacturing",
            title: "Fabrication & DFM",
            narrative: [
                "At **BJS Fabrications Ltd**, I designed and validated structural steel enclosures for high-temperature industrial systems using **SolidWorks** and **AutoCAD**. Each design underwent rigorous **FEA analysis** to verify load capacity, thermal performance, and structural integrity while ensuring strict **GD&T compliance** with **ASME Y14.5**, **BS 8888**, and **ISO 9001** manufacturing standards.",
                "I developed innovative thermal management and cooling solutions through dedicated R&D initiatives, utilizing hand calculations for heat dissipation, stress analysis, and both static and dynamic load validation. These designs had to withstand stringent operational requirements in extreme high-temperature industrial environments, demanding both precision engineering and practical manufacturability.",
                "Leading **DFM optimization**, I worked in close collaboration with workshop teams to analyze fabrication workflows, simplify complex weldments, and optimize bend radii for standard tooling capabilities. This hands-on partnership between design engineering and production reduced raw material wastage and lowered overall manufacturing costs while maintaining structural performance. Through root cause analysis of legacy failures and implementation of material upgrades and weldment optimizations, I enhanced product durability by **20%**.",
                "I managed the complete project lifecycle from initial concept through delivery, creating detailed **DVP (Design Verification Plan)** documentation for safety-critical components and conducting formal Design Reviews to ensure compliance. Serving as the key arbitration point between architectural and workshop teams, I utilized agile methodologies to swiftly resolve design incompatibilities and maintain project momentum."
            ],
            images: [
                {
                    id: "p3_fab",
                    names: ["fabrication.jpg"],
                    caption: "FABRICATION RENDER",
                    icon: "fa-industry"
                }
            ],
            reverse: false
        },
        {
            subtitle: "Computational Design",
            title: "Topology & Lightweighting",
            narrative: [
                "At **Gajra Gears Pvt. Ltd.**, I designed and optimized gearbox cooling systems and lightweight aluminum housings in **CATIA V5**. The challenge was achieving maximum mass reduction while maintaining thermal stability and structural integrity under demanding dynamic loading conditions for automotive and motorsport applications.",
                "Utilizing **Topology Optimization** and **FEA thermal analysis** in PTC Creo, I mathematically defined load paths and constraints to systematically remove non-structural mass from cast **A356-T6 aluminum** gearbox housings. This computational approach achieved a verified **12% weight reduction** without compromising stress distribution or thermal performance—a critical achievement for high-performance drivetrains where every gram impacts acceleration and efficiency.",
                "I led comprehensive **DFM reviews** for machined and welded thermal components, collaborating directly with manufacturing teams to optimize production processes and ensure designs met strict performance, weight, and durability targets. My work included detailed **tolerance stack-up analysis** and implementation of **GD&T per ASME Y14.5** for gearbox assemblies, ensuring proper fitment and thermal expansion compatibility across the entire operating temperature range.",
                "Through focused R&D initiatives, I spearheaded thermal management improvements that increased product durability by **15%**. This involved analysing heat generation in existing transmissions, implementing strategic material selection, redesigning integrated cooling channels within housing designs, and developing self-cooling strategies. Each modification was validated through rigorous **FEA simulation** and hand calculations to optimize heat dissipation performance for extreme operating conditions in industrial and automotive environments."
            ],
            images: [
                {
                    id: "p4_opt",
                    names: ["topology.jpg"],
                    caption: "TOPOLOGY OPTIMIZATION",
                    icon: "fa-cogs"
                }
            ],
            reverse: true
        },
        {
            subtitle: "Validation & Quality",
            title: "Test & Instrumentation",
            narrative: [
                "Rigorous validation is the cornerstone of reliable engineering. Throughout my career, I have designed and executed comprehensive test protocols to validate mechanical systems against **ISO**, **ASTM**, **Euro NCAP**, and industry-specific homologation standards. My experience spans destructive testing, fatigue analysis, durability validation, and environmental chamber testing to ensure components exceed real-world operational requirements.",
                "At **Switch Mobility**, I led comprehensive validation of cooling systems and electromechanical components for the ODIN platform. I instrumented BTMS test rigs with **thermocouples, flow meters,** and **pressure transducers** to capture critical thermal and hydraulic data during extensive cycling tests. Using **DAQ systems** and custom **MATLAB** scripts, I processed real-time sensor data to validate design assumptions and verify performance against specifications. I conducted **vibration testing per ISO 16750-3** and physical validation protocols, ensuring battery cradles, cooling manifolds, and EDU components met stringent structural and durability requirements for heavy-duty electric vehicle applications. This work involved prototype build support, virtual validation events, and troubleshooting to enhance system reliability and extend product lifecycle.",
                "I have extensive experience testing **ADAS, ABS,** and **mechanics simulation** on **Virtuocity Simulators**, working with startups and small-scale automotive firms including **Arrival**, **Ginetta Cars**, and **Neo**. This involved training and optimizing their AI systems for **UK road conditions**, performing comprehensive sensor integration testing, and validating autonomous driving algorithms under diverse operational scenarios. By leveraging advanced simulation platforms, I helped these emerging automotive companies accelerate development cycles, reduce physical prototyping costs, and ensure their systems met stringent homologation requirements before real-world deployment.",
                "My validation approach combines theoretical calculations with empirical testing. I've developed comprehensive **DVP (Design Verification Plans)** for safety-critical components, led technical design reviews to ensure test coverage, and utilized both virtual simulation and physical prototype testing to de-risk designs before production release. This disciplined methodology has consistently delivered robust, validated mechanical systems that meet all performance, safety, and regulatory requirements."
            ],
            specs: [
                { label: "Standards", value: "ISO 16750 / ASTM E8" },
                { label: "Methods", value: "Vibration / Thermal / Fatigue" },
                { label: "Tools", value: "DAQ / MATLAB / LabVIEW" }
            ],
            images: [
                {
                    id: "p5_test",
                    names: ["test_instrumentation.jpg"],
                    caption: "TEST SETUP",
                    icon: "fa-vial"
                }
            ],
            reverse: false
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
