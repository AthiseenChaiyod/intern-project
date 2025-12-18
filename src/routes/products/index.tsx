import { component$, $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";

const ProductSection = component$(
  ({
    product,
    isAlternate,
    onNavigate,
  }: {
    product: any;
    isAlternate: boolean;
    onNavigate: any;
  }) => {
    const isVisible = useSignal(false);

    useVisibleTask$(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
          }
        },
        { threshold: 0.1 }
      );

      const el = document.querySelector(`[data-product-id="${product.id}"]`);
      if (el) {
        observer.observe(el);
      }

      return () => observer.disconnect();
    });

    return (
      <div
        data-product-id={product.id}
        class={css({
          py: { base: "3rem", md: "6rem" },
          borderBottom: "1px solid",
          borderBottomColor: "gray.200",
          opacity: isVisible.value ? 1 : 0.7,
          transform: isVisible.value ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s ease-out",
        })}
      >
        <div
          class={css({
            maxW: "1400px",
            mx: "auto",
            px: { base: "1rem", md: "2rem" },
          })}
        >
          <div
            class={css({
              display: "grid",
              gridTemplateColumns: { base: "1fr", sm: "1fr 1fr" },
              gap: { base: "2rem", md: "4rem" },
              alignItems: "center",
              ...(isAlternate && { gridAutoFlow: "dense" }),
            })}
          >
            <div
              class={css({
                width: "100%",
                height: { base: "280px", md: "400px" },
                overflow: "hidden",
                borderRadius: "16px",
                bg: "gray100",
                order: { base: 0, sm: isAlternate ? 2 : 0 },
              })}
            >
              <img
                src={product.icon}
                alt={product.name}
                class={css({
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",

                  _hover: { transform: "scale(1.08)" },
                })}
              />
            </div>

            <div
              class={css({
                order: { base: 0, sm: isAlternate ? 1 : 0 },
              })}
            >
              <h2
                class={css({
                  fontSize: { base: "1.75rem", md: "2.5rem" },
                  fontWeight: "bold",
                  mb: "1.5rem",
                  color: "gray.600",
                  lineHeight: 1.2,
                })}
              >
                {product.name}
              </h2>

              <p
                class={css({
                  color: "secondary",
                  fontSize: { base: "0.95rem", md: "1.1rem" },
                  lineHeight: 1.8,
                  mb: "2rem",
                })}
              >
                {product.description}
              </p>

              <div
                class={css({
                  mb: "2rem",
                })}
              >
                <h3
                  class={css({
                    fontSize: "1.15rem",
                    fontWeight: "bold",
                    mb: "1rem",
                    color: "gray.600",
                  })}
                >
                  Key Features:
                </h3>
                <ul
                  class={css({
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: {
                      base: "1fr",
                      sm: "1fr 1fr",
                    },
                    gap: "0.75rem",
                  })}
                >
                  {product.features.map((feature: string, idx: number) => (
                    <li
                      key={idx}
                      class={css({
                        color: "secondary",
                        fontSize: "0.95rem",

                        _before: {
                          content: '"✓ "',
                          color: "amber.400",
                          fontWeight: "bold",
                          mr: "0.75rem",
                        },
                      })}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick$={() => onNavigate(`/products/${product.id}`)}
                class={css({
                  bg: "amber.400",
                  color: "gray.800",
                  px: "2rem",
                  py: "0.85rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "semibold",
                  transition: "all 0.3s ease",

                  _hover: { bg: "primaryDark", transform: "translateY(-2px)" },
                })}
              >
                View Full Details →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default component$(() => {
  const nav = useNavigate();
  const handleNavigate = $((path: string) => {
    nav(path);
  });

  const products = [
    {
      id: "car-parking-system",
      name: "Car Parking System",
      icon: "/parking.webp",
      shortDesc: "Automated parking with LPR and real-time access control",
      category: "Hardware",
      description:
        "State-of-the-art automated parking systems featuring barrier gates, license plate recognition, and seamless access control for efficient vehicle management.",
      content:
        "Our Car Parking System is the industry-leading solution for automated vehicle management. Designed for modern parking facilities, shopping malls, and commercial complexes, this system combines cutting-edge hardware and software to streamline the parking experience.\n\nKey Benefits:\n• Automated barrier gates with failsafe mechanisms\n• License plate recognition (LPR) for touchless entry\n• Real-time parking availability tracking\n• Integration with multiple payment methods\n• Cloud-based revenue management\n• 24/7 operational support\n\nTechnical Specifications:\n• Works with all vehicle types and license plate formats\n• Recognition accuracy: 99.8%\n• Response time: Less than 1 second\n• Supports multiple entry/exit lanes\n• Weather-resistant outdoor sensors\n• Encrypted data transmission\n\nOur system reduces parking entry time by 70% and increases facility revenue by managing pricing dynamically based on demand.",
      features: [
        "Automated barrier gates",
        "License plate recognition",
        "Real-time monitoring",
        "Payment integration",
      ],
    },
    {
      id: "turnstiles-gate",
      name: "Turnstiles Gate",
      icon: "/turnstiles2.webp",
      shortDesc: "High-security pedestrian access control system",
      category: "Security",
      description:
        "High-security turnstile gates designed for pedestrian access control in parking facilities, commercial buildings, and restricted areas.",
      content:
        "Turnstile gates are essential for controlling pedestrian access in high-security environments. Our turnstiles combine elegance with robust security features, making them ideal for parking facilities, office buildings, and restricted access zones.\n\nFeatures:\n• Multiple authentication methods: RFID, biometric, PIN\n• Anti-tailgating technology with advanced sensors\n• Smooth, quiet operation with emergency bypass\n• Weatherproof design for outdoor installations\n• Real-time access logging and reporting\n• Seamless integration with access control systems\n\nSecurity Advantages:\n• Prevents unauthorized access attempts\n• Detects and logs every access event\n• Emergency lockdown capabilities\n• Integrated with building security systems\n• Customizable access rules per user group\n• Mobile credential support\n\nPerfect for:\n• Parking facility entrances\n• Corporate offices and data centers\n• Government buildings\n• Events and venues\n• Gated communities\n\nOur turnstile gates have been trusted by Fortune 500 companies for over a decade.",
      features: [
        "Biometric authentication",
        "RFID card access",
        "Anti-tailgating detection",
        "Emergency release function",
      ],
    },
    {
      id: "software-and-application",
      name: "Software & Application",
      icon: "/software-n-app.jpg",
      shortDesc: "Complete parking management platform with analytics",
      category: "Software",
      description:
        "Comprehensive parking management software with intuitive dashboards, real-time analytics, and mobile applications for administrators and users.",
      content:
        "Our Software & Application suite provides complete parking management from a centralized platform. Whether you operate a single facility or a network of parking locations, our software scales to meet your needs.\n\nAdmin Dashboard Features:\n• Real-time occupancy monitoring across all locations\n• Revenue analytics and reporting\n• Dynamic pricing management\n• User and access management\n• Automated billing and invoicing\n• Integration with accounting systems\n• Comprehensive audit trails\n\nUser Mobile Application:\n• Find available parking spaces instantly\n• Pre-reserve parking spots\n• Multiple payment methods\n• Automated invoicing and receipts\n• Vehicle information management\n• Push notifications for reminders\n• Parking history and statistics\n\nAdvanced Analytics:\n• Peak occupancy patterns\n• Revenue optimization recommendations\n• Maintenance scheduling alerts\n• Access violation reports\n• Custom report generation\n• Predictive analytics for capacity planning\n\nIntegration Capabilities:\n• Works with all major hardware systems\n• API for third-party integration\n• Cloud and on-premise deployment options\n• Backup and disaster recovery\n\nOur software has helped facilities increase revenue by an average of 35% through intelligent pricing and improved operations.",
      features: [
        "Real-time monitoring dashboard",
        "Revenue reporting",
        "Mobile app for users",
        "Cloud-based management",
      ],
    },
    {
      id: "visitor-management-system",
      name: "Visitor Management System",
      icon: "/vms2.jpg",
      shortDesc: "Digital registration and security tracking for guests",
      category: "Security",
      description:
        "Streamlined visitor registration and tracking system that enhances security while providing a professional welcome experience for guests.",
      content:
        "Welcome your visitors with a modern, secure, and professional experience. Our Visitor Management System streamlines the registration process while maintaining comprehensive security protocols.\n\nVisitor Experience:\n• Quick digital registration via tablet or smartphone\n• Optional pre-registration for expected guests\n• Automatic badge printing\n• Real-time host notifications\n• Parking pass integration\n• Photo capture for ID verification\n• Multiple language support\n\nSecurity Features:\n• Real-time visitor tracking throughout facility\n• Automatic check-out reminders\n• Background screening integration\n• Restricted area access control\n• Incident reporting system\n• Video integration for video review\n• Tailgating detection\n\nAdministrative Tools:\n• Detailed visitor analytics and reports\n• Peak visit time management\n• Violation tracking and alerts\n• Integration with HR and reception systems\n• Customizable visitor categories\n• Export reports for compliance\n\nBenefits:\n• Improves facility security\n• Creates professional first impression\n• Reduces reception workload by 80%\n• Streamlines emergency procedures\n• Provides valuable data for facility planning\n• Helps meet compliance requirements (GDPR, HIPAA)\n\nIdeal for:\n• Corporate offices\n• Healthcare facilities\n• Government buildings\n• Educational institutions\n• Data centers\n• Hospitality venues",
      features: [
        "Digital visitor registration",
        "Badge printing",
        "Host notifications",
        "Visitor analytics",
      ],
    },
    {
      id: "parking-guidance",
      name: "Parking Guidance",
      icon: "/parking-guidance.jpg",
      shortDesc: "Smart sensors guide drivers to available spaces",
      category: "Technology",
      description:
        "Intelligent parking guidance system utilizing sensors and digital signage to direct drivers to available parking spaces efficiently.",
      content:
        "Stop circling for parking spots! Our Parking Guidance System uses advanced sensor technology to guide drivers directly to available spaces, reducing frustration and emissions.\n\nHow It Works:\n• Ultrasonic sensors detect parking space occupancy\n• Real-time data transmitted to central system\n• LED guidance displays direct drivers to available spaces\n• Mobile app shows availability before entering facility\n• Dynamic traffic management reduces congestion\n\nBenefits:\n• Reduce average parking search time from 15 minutes to 2-3 minutes\n• Decrease facility emissions by 20-30%\n• Improve customer satisfaction significantly\n• Increase parking facility utilization by 15-25%\n• Reduce traffic congestion within facility\n• Enhance overall visitor experience\n\nTechnical Capabilities:\n• Covers indoor and outdoor parking areas\n• Weather-resistant ultrasonic sensors\n• Low-power wireless communication\n• 99.5% accuracy in space detection\n• Scalable to facilities of any size\n• Integration with mobile booking systems\n\nDisplay Technologies:\n• LED guidance signs (dynamic arrow indicators)\n• Digital displays showing section occupancy\n• Mobile app real-time updates\n• Voice guidance system integration\n\nData & Analytics:\n• Hourly occupancy reports\n• Peak utilization analysis\n• Space utilization patterns\n• Revenue optimization insights\n• Predictive capacity planning\n\nEnvironmental Impact:\n• Reduce CO2 emissions per vehicle by up to 5kg\n• Support sustainability goals\n• Improve air quality in parking facilities\n• Compliance with environmental regulations\n\nOur Parking Guidance System is used in over 500 facilities worldwide, helping drivers find parking faster while reducing environmental impact.",
      features: [
        "Ultrasonic sensors",
        "LED guidance displays",
        "Occupancy tracking",
        "Mobile app integration",
      ],
    },
  ];

  return (
    <>
      <div
        class={css({
          bg: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          color: "white",
          py: { base: "3rem", md: "4rem" },
        })}
      >
        <div
          class={css({
            maxW: "1400px",
            mx: "auto",
            px: { base: "1rem", md: "2rem" },
            textAlign: "center",
          })}
        >
          <h1
            class={css({
              fontSize: { base: "2rem", md: "3rem" },
              fontWeight: "bold",
              mb: "1rem",
              color: "amber.400",
            })}
          >
            Our Products
          </h1>
          <p
            class={css({
              fontSize: { base: "1rem", md: "1.2rem" },
              opacity: 0.9,
            })}
          >
            Comprehensive parking solutions tailored to your needs
          </p>
        </div>
      </div>

      {products.map((product, idx) => (
        <ProductSection
          key={product.id}
          product={product}
          isAlternate={idx % 2 === 1}
          onNavigate={handleNavigate}
        />
      ))}
    </>
  );
});

export const head: DocumentHead = {
  title: "Products - PTI",
};
