import { component$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();

  const products = [
    {
      id: "car-parking-system",
      name: "Car Parking System",
      icon: "/parking.webp",
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
      specifications: {
        accuracy: "99.8%",
        responseTime: "< 1 second",
        supportedVehicles: "All types",
        dataEncryption: "Military-grade",
        warranty: "5 years",
        implementation: "2-4 weeks",
      },
      pricing: "Contact us for more detail",
    },
    {
      id: "turnstiles-gate",
      name: "Turnstiles Gate",
      icon: "/turnstiles2.webp",
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
      specifications: {
        authenticationType: "Multi-method",
        passageTime: "< 2 seconds",
        capacity: "Up to 60 passages/min",
        design: "Weatherproof",
        warranty: "3 years",
        implementation: "1-2 weeks",
      },
      pricing: "Contact for quote",
    },
    {
      id: "software-and-application",
      name: "Software & Application",
      icon: "/software-n-app.jpg",
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
      specifications: {
        deployment: "Cloud & On-Premise",
        users: "Unlimited",
        locations: "Unlimited",
        uptime: "99.9% SLA",
        dataBackup: "Automated daily",
        support: "24/7 available",
      },
      pricing: "Subscription-based",
    },
    {
      id: "visitor-management-system",
      name: "Visitor Management System",
      icon: "/vms2.jpg",
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
      specifications: {
        registrationTime: "< 1 minute",
        languages: "50+ supported",
        reporting: "Custom reports",
        compliance: "GDPR, HIPAA ready",
        scaling: "Up to 10,000 visitors/day",
        support: "Dedicated support",
      },
      pricing: "Volume-based licensing",
    },
    {
      id: "parking-guidance",
      name: "Parking Guidance",
      icon: "/parking-guidance.jpg",
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
      specifications: {
        sensorAccuracy: "99.5%",
        communicationRange: "Up to 500m",
        powerConsumption: "Ultra-low",
        installation: "Non-invasive",
        warranty: "5 years",
        maintenance: "Minimal required",
      },
      pricing: "Sensor-based pricing",
    },
  ];

  const product = products.find((p) => p.id === loc.params["id"]);

  if (!product) {
    return (
      <div
        class={css({
          py: "4rem",
          px: { base: "1rem", md: "2rem" },
          bg: "light",
          minH: "calc(100vh - 70px)",
        })}
      >
        <div
          class={css({
            maxW: "1400px",
            mx: "auto",
            textAlign: "center",
          })}
        >
          <h1
            class={css({
              fontSize: "2rem",
              fontWeight: "bold",
              mb: "1rem",
            })}
          >
            Product Not Found
          </h1>
          <p
            class={css({
              color: "secondary",
              mb: "2rem",
            })}
          >
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick$={() => nav("/products")}
            class={css({
              bg: "amber.400",
              color: "gray.800",
              px: "2rem",
              py: "0.75rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "semibold",
            })}
          >
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      class={css({
        py: { base: "2rem", md: "4rem" },
        bg: "light",
        minH: "calc(100vh - 70px)",
      })}
    >
      <div
        class={css({
          maxW: "1200px",
          mx: "auto",
          px: { base: "1rem", md: "2rem" },
        })}
      >
        <button
          onClick$={() => nav("/products")}
          class={css({
            display: { base: "block", sm: "none" },
            color: "gray.800",
            fontSize: "1rem",
            cursor: "pointer",
            bg: "transparent",
            border: "none",
            mb: "2rem",
            fontWeight: "semibold",

            _hover: { textDecoration: "underline" },
          })}
        >
          ← Back to Products
        </button>

        <div
          class={css({
            bg: "white",
            borderRadius: "12px",
            boxShadow: "lg",
            overflow: "hidden",
            mb: "3rem",
          })}
        >
          <div
            style={{
              backgroundImage: `url(${product.icon})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "scroll",
              position: "relative",
            }}
            class={css({
              color: "white",
              p: { base: "2rem", md: "4rem" },
              textAlign: "center",
            })}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            ></div>
            <div
              class={css({
                position: "relative",
                zIndex: 1,
              })}
            >
              <h1
                class={css({
                  fontSize: { base: "2rem", md: "3rem" },
                  fontWeight: "bold",
                  mb: "1rem",
                })}
              >
                {product.name}
              </h1>
              <p
                class={css({
                  fontSize: "1.1rem",
                  opacity: 0.95,
                  maxW: "800px",
                  mx: "auto",
                })}
              >
                {product.description}
              </p>
            </div>
          </div>

          <div
            class={css({
              p: { base: "2rem", md: "4rem" },
            })}
          >
            <div
              class={css({
                display: "grid",
                gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
                gap: "3rem",
                mb: "3rem",
              })}
            >
              <div>
                <h2
                  class={css({
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    mb: "1.5rem",
                    color: "gray.800",
                  })}
                >
                  Key Features
                </h2>
                <ul
                  class={css({
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  })}
                >
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      class={css({
                        color: "dark",
                        fontSize: "1.05rem",

                        _before: {
                          content: '"✓ "',
                          color: "amber.400",
                          fontWeight: "bold",
                          mr: "0.75rem",
                          fontSize: "1.3rem",
                        },
                      })}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2
                  class={css({
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    mb: "1.5rem",
                    color: "gray.800",
                  })}
                >
                  Specifications
                </h2>
                <div
                  class={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  })}
                >
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        class={css({
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: "1rem",
                          bg: "light",
                          borderRadius: "8px",
                          borderLeft: "4px solid",
                          borderColor: "amber.400",
                        })}
                      >
                        <span
                          class={css({
                            fontWeight: "semibold",
                            color: "dark",
                            textTransform: "capitalize",
                          })}
                        >
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span
                          class={css({
                            color: "gray.600",
                            fontWeight: "bold",
                          })}
                        >
                          {value as string}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div
              class={css({
                borderTop: "2px solid",
                borderColor: "gray.200",
                pt: "2rem",
              })}
            >
              <h2
                class={css({
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  mb: "1.5rem",
                  color: "gray.800",
                })}
              >
                Detailed Information
              </h2>
              <p
                class={css({
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "dark",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                })}
              >
                {product.content}
              </p>
            </div>

            <div
              class={css({
                mt: "2rem",
                pt: "2rem",
                borderTop: "2px solid",
                borderColor: "gray.200",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              })}
            >
              <button
                onClick$={() => nav("/contact")}
                class={css({
                  bg: "amber.400",
                  color: "gray.800",
                  px: "2.5rem",
                  py: "1rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.05rem",
                  fontWeight: "semibold",
                  transition: "all 0.2s",

                  _hover: { transform: "translateY(-2px)" },
                })}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "Product Details - PTI",
  };
};
