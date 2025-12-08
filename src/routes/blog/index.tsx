import {
  component$,
  $,
  useSignal,
  useContext,
  useComputed$,
} from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";
import { flex, grid } from "~/styled-system/patterns";
import { roleContext } from "../layout";

const usePost = routeLoader$(async (loaderEvent) => {
  const response = await fetch("http://localhost:4000/post/get", {
    method: "GET",
  });
  const body = await response.json();

  return body.data;
});

export default component$(() => {
  const nav = useNavigate();
  const displayedPostsCount = useSignal(6);

  const posts = usePost().value;

  const role = useContext(roleContext);

  const handleNavigate = $((path: string) => {
    nav(path);
  });

  const handleSeeMore = $(() => {
    displayedPostsCount.value += 6;
  });

  // const blogPosts = [
  //   {
  //     id: 1,
  //     title: "The Future of Smart Parking Solutions",
  //     excerpt:
  //       "Discover how AI and IoT are revolutionizing parking management systems for modern cities and commercial spaces.",
  //     content:
  //       "Smart parking solutions are transforming the way cities and businesses manage parking. By integrating AI and IoT technologies, parking systems can now predict demand, optimize space usage, and provide real-time information to drivers.\n\nThe future of parking is automated, efficient, and user-centric. With smart guidance systems and mobile integration, drivers can find parking spots in seconds rather than minutes. This not only saves time and fuel but also reduces emissions and traffic congestion.\n\nOur solutions leverage cutting-edge technology to provide seamless parking experiences. From real-time availability updates to mobile app integration, we're revolutionizing how people park their vehicles.",
  //     date: "November 20, 2025",
  //     author: "John Smith",
  //     category: "Technology",
  //   },
  //   {
  //     id: 2,
  //     title: "5 Benefits of Automated Parking Systems",
  //     excerpt:
  //       "Learn why businesses are switching to automated parking solutions and how they improve efficiency and user experience.",
  //     content:
  //       "Automated parking systems offer numerous benefits for businesses and property managers:\n\n1. **Increased Capacity**: Automated systems can store more vehicles in the same space compared to traditional parking.\n\n2. **Cost Reduction**: Reduced labor costs and optimized space usage lead to significant savings.\n\n3. **Enhanced Security**: Advanced access control and monitoring systems protect vehicles and prevent unauthorized access.\n\n4. **User Experience**: Quick entry and exit processes, real-time space availability, and seamless payment options improve customer satisfaction.\n\n5. **Data Analytics**: Comprehensive insights into parking patterns help optimize pricing and operations.\n\nThese benefits make automated parking systems an excellent investment for commercial properties, airports, and urban developments.",
  //     date: "November 15, 2025",
  //     author: "Sarah Johnson",
  //     category: "Business",
  //   },
  //   {
  //     id: 3,
  //     title: "Implementing Access Control: Best Practices",
  //     excerpt:
  //       "A comprehensive guide to implementing secure and efficient access control systems in parking facilities.",
  //     content:
  //       "Access control is critical for parking facility security. Here are the best practices for implementation:\n\n**Multi-Layer Authentication**: Combine card readers, biometric systems, and mobile app authentication for enhanced security.\n\n**Integration with Management Systems**: Connect access control with parking management software for real-time monitoring and reporting.\n\n**Regular Audits**: Conduct security audits to identify vulnerabilities and improve overall system performance.\n\n**User Training**: Ensure staff are properly trained on access control procedures and emergency protocols.\n\n**Maintenance Schedule**: Regular maintenance ensures systems operate reliably and prevents unauthorized access.\n\nProper access control implementation protects assets, ensures safety, and provides valuable operational insights.",
  //     date: "November 10, 2025",
  //     author: "Michael Chen",
  //     category: "Security",
  //   },
  //   {
  //     id: 4,
  //     title: "Visitor Management Systems: Complete Guide",
  //     excerpt:
  //       "Everything you need to know about modern visitor management systems and their integration with parking solutions.",
  //     content:
  //       "Visitor management systems streamline the process of welcoming guests to your facility. Key components include:\n\n**Pre-Arrival Registration**: Allow visitors to register online before arriving, reducing wait times.\n\n**Real-Time Tracking**: Monitor visitor movements and ensure compliance with facility policies.\n\n**Parking Integration**: Automatically issue temporary parking passes and provide wayfinding information.\n\n**Security Screening**: Conduct background checks and maintain visitor logs for security purposes.\n\n**Mobile Notifications**: Send notifications to hosts about visitor arrivals and provide guests with building information.\n\n**Analytics & Reporting**: Generate insights about visitor patterns to improve operations and enhance security.\n\nModern visitor management systems enhance security, improve user experience, and provide valuable operational data.",
  //     date: "November 5, 2025",
  //     author: "Emily Davis",
  //     category: "Technology",
  //   },
  //   {
  //     id: 5,
  //     title: "Parking Guidance Technology Explained",
  //     excerpt:
  //       "Understanding the technology behind parking guidance systems and how they enhance the parking experience.",
  //     content:
  //       "Parking guidance technology revolutionizes how drivers find available spaces. The system works by:\n\n**Sensor Detection**: Ground-level sensors detect when parking spaces become available or occupied.\n\n**Real-Time Updates**: Information is instantly transmitted to digital signage and mobile applications.\n\n**Smart Routing**: Algorithms guide drivers directly to available spaces, minimizing search time.\n\n**Mobile Integration**: Apps provide space availability, pricing information, and direct navigation.\n\n**Analytics**: Collect data on parking patterns, peak hours, and revenue optimization opportunities.\n\n**Reduced Emissions**: By decreasing time spent searching for parking, vehicles emit less carbon.\n\nOur advanced parking guidance systems have helped facilities reduce driver search time by up to 30%, improving the parking experience while reducing environmental impact.",
  //     date: "October 30, 2025",
  //     author: "David Wilson",
  //     category: "Technology",
  //   },
  //   {
  //     id: 6,
  //     title: "ROI of Smart Parking Solutions",
  //     excerpt:
  //       "Calculate the return on investment for smart parking systems and understand their long-term value.",
  //     content:
  //       "Smart parking solutions provide significant return on investment. Here's how to calculate ROI:\n\n**Initial Investment**: Consider hardware, software, installation, and training costs.\n\n**Revenue Gains**: Increased capacity leads to more parking revenue. Dynamic pricing optimizes income.\n\n**Cost Savings**: Reduced labor costs and maintenance efficiency contribute to bottom-line savings.\n\n**Operational Benefits**: Improved efficiency and reduced errors result in measurable savings.\n\n**Timeline**: Most facilities see full ROI within 3-5 years.\n\n**Long-term Value**: Beyond ROI, enhanced security, improved customer satisfaction, and data-driven insights provide lasting benefits.\n\nWhen properly implemented, smart parking systems deliver consistent returns while improving service quality and operational efficiency. Our clients typically see a 40-50% improvement in operational efficiency within the first year.",
  //     date: "October 25, 2025",
  //     author: "Jennifer Lee",
  //     category: "Business",
  //   },
  //   {
  //     id: 7,
  //     title: "Mobile Integration for Parking Apps",
  //     excerpt:
  //       "How to build seamless mobile experiences for parking reservation and payment systems.",
  //     content:
  //       "Mobile apps have revolutionized how users interact with parking systems. Key features include:\n\n**Real-Time Availability**: Users see available spots instantly with live updates.\n\n**Reservation System**: Pre-book spots to guarantee parking availability.\n\n**Digital Payments**: Multiple payment methods integrated directly into the app.\n\n**Navigation**: Turn-by-turn directions to reserved or available parking spots.\n\n**History & Analytics**: Track parking history and generate expense reports.\n\n**Notifications**: Receive alerts about parking violations or expiring time.\n\nSuccessful mobile apps increase user engagement by 45% and improve satisfaction ratings significantly.",
  //     date: "October 20, 2025",
  //     author: "Alex Thompson",
  //     category: "Technology",
  //   },
  //   {
  //     id: 8,
  //     title: "Sustainability in Parking Operations",
  //     excerpt:
  //       "How smart parking systems contribute to environmental goals and carbon reduction.",
  //     content:
  //       "Sustainability is increasingly important in facility management. Smart parking systems help:\n\n**Reduce Emissions**: Less time searching for parking means fewer vehicle emissions.\n\n**Energy Efficiency**: LED signage and smart controls reduce power consumption.\n\n**Green Certifications**: Support LEED and other environmental certification programs.\n\n**Data-Driven Optimization**: Use analytics to minimize unnecessary traffic flows.\n\n**Electric Vehicle Support**: Dedicated EV charging integration and reserved spots.\n\n**Community Impact**: Contribute to cleaner air quality and reduced congestion.\n\nFacilities implementing smart parking systems report an average 25% reduction in environmental impact.",
  //     date: "October 15, 2025",
  //     author: "Lisa Rodriguez",
  //     category: "Business",
  //   },
  //   {
  //     id: 9,
  //     title: "Cybersecurity in Access Control Systems",
  //     excerpt:
  //       "Protecting your parking facility from security threats and data breaches.",
  //     content:
  //       "Cybersecurity is critical for modern parking systems. Essential measures include:\n\n**Encryption**: All data transmission must be encrypted using industry standards.\n\n**Multi-Factor Authentication**: Require multiple verification methods for admin access.\n\n**Regular Updates**: Keep systems patched with the latest security updates.\n\n**Access Logs**: Maintain detailed records of all access attempts and modifications.\n\n**Incident Response**: Have a plan in place for potential security incidents.\n\n**Compliance**: Meet GDPR, CCPA, and other regulatory requirements.\n\nProper security implementation protects both your facility and your users' data.",
  //     date: "October 10, 2025",
  //     author: "Robert Martinez",
  //     category: "Security",
  //   },
  //   {
  //     id: 10,
  //     title: "Training Staff on New Parking Systems",
  //     excerpt:
  //       "Best practices for employee training and adoption of modern parking technology.",
  //     content:
  //       "Successful technology implementation requires proper staff training. Key steps:\n\n**Comprehensive Training**: Provide hands-on training for all staff members.\n\n**Documentation**: Create detailed guides and video tutorials for reference.\n\n**Ongoing Support**: Establish a support team for questions and troubleshooting.\n\n**Change Management**: Help staff understand the benefits of new systems.\n\n**Feedback Loops**: Collect feedback to improve training and procedures.\n\n**Certification**: Ensure staff are certified to operate equipment properly.\n\nWell-trained staff reduces errors and improves customer satisfaction.",
  //     date: "October 5, 2025",
  //     author: "Michelle Wong",
  //     category: "Business",
  //   },
  //   {
  //     id: 11,
  //     title: "Integration with Payment Systems",
  //     excerpt:
  //       "Connecting your parking system with major payment processors and financial platforms.",
  //     content:
  //       "Payment integration is essential for seamless operations. Integration options:\n\n**Credit/Debit Cards**: Support all major card types and payment networks.\n\n**Digital Wallets**: Apple Pay, Google Pay, and other mobile payment methods.\n\n**Subscription Plans**: Monthly and annual membership options.\n\n**Corporate Accounts**: Integration with company billing and expense management.\n\n**Reconciliation**: Automatic financial reconciliation and reporting.\n\n**Fraud Detection**: Advanced fraud prevention and anomaly detection.\n\nProper payment integration increases revenue and improves user experience.",
  //     date: "September 30, 2025",
  //     author: "David Park",
  //     category: "Technology",
  //   },
  //   {
  //     id: 12,
  //     title: "Analytics and Reporting for Parking Facilities",
  //     excerpt:
  //       "Using data analytics to optimize operations and improve facility performance.",
  //     content:
  //       "Data-driven decision making improves parking operations significantly. Key metrics:\n\n**Occupancy Rates**: Track usage patterns throughout the day and week.\n\n**Revenue Analysis**: Monitor pricing effectiveness and revenue trends.\n\n**Peak Hour Analysis**: Identify peak times to optimize staffing and resources.\n\n**Customer Demographics**: Understand who uses your facility.\n\n**Forecasting**: Predict future trends and plan accordingly.\n\n**Benchmarking**: Compare performance against industry standards.\n\nFacilities using advanced analytics report 30% better operational efficiency.",
  //     date: "September 25, 2025",
  //     author: "Emma Clarke",
  //     category: "Business",
  //   },
  // ];

  // Get only the posts to display
  const displayedPosts = posts.slice(0, displayedPostsCount.value);
  const hasMorePosts = displayedPostsCount.value < posts.length;

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
          })}
        >
          <div
            class={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            })}
          >
            <div>
              <h1
                class={css({
                  fontSize: { base: "2rem", md: "3rem" },
                  fontWeight: "bold",
                  mb: "1rem",
                  color: "amber.400",
                })}
              >
                Blog
              </h1>
              <p
                class={css({
                  fontSize: { base: "1rem", md: "1.2rem" },
                  opacity: 0.9,
                })}
              >
                Insights and updates from the world of parking solutions
              </p>
            </div>
            {role.value === "admin" && (
              <button
                onClick$={() => handleNavigate("/blog/create")}
                class={css({
                  bg: "amber.400",
                  color: "gray.800",
                  px: "1.5rem",
                  py: "0.75rem",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: "semibold",
                  cursor: "pointer",
                  border: "none",
                  _hover: {
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                    color: "gray.800",
                  },
                  transition: "all 0.2s",
                })}
              >
                Create Post
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        class={css({
          py: { base: "3rem", md: "5rem" },
          bg: "light",
        })}
      >
        <div
          class={css({
            maxW: "1400px",
            mx: "auto",
            px: { base: "1rem", md: "2rem" },
          })}
        >
          {posts.length ? (
            <div
              class={grid({
                columns: { base: 1, sm: 2, md: 3 },
                gap: "2rem",
              })}
            >
              {displayedPosts.map((post: any) => (
                <div
                  key={post.id}
                  onClick$={() => handleNavigate(`/blog/${post.id}`)}
                  class={css({
                    bg: "white",
                    borderRadius: "12px",
                    boxShadow: "md",
                    overflow: "hidden",
                    _hover: { transform: "translateY(-4px)", boxShadow: "lg" },
                    transition: "all 0.3s",
                    cursor: "pointer",
                  })}
                >
                  <div
                    class={css({
                      p: "1.5rem",
                    })}
                  >
                    <div
                      class={css({
                        display: "inline-block",
                        bg: "amber.400",
                        color: "gray.800",
                        px: "0.75rem",
                        py: "0.25rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: "semibold",
                        mb: "1rem",
                      })}
                    >
                      {post.category}
                    </div>
                    <h2
                      class={css({
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        mb: "0.75rem",
                        color: "dark",
                      })}
                    >
                      {post.title}
                    </h2>
                    <p
                      class={css({
                        color: "secondary",
                        mb: "1rem",
                        lineHeight: 1.6,
                      })}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      class={css({
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.875rem",
                        color: "secondary",
                        pt: "1rem",
                        borderTop: "1px solid",
                        borderColor: "gray.200",
                      })}
                    >
                      <span>{post.author}</span>
                      <span>
                        {new Intl.DateTimeFormat("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }).format(new Date(post.date))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              class={css({
                textAlign: "center",
                mt: "3rem",
                p: "2rem",
                color: "secondary",
                fontSize: "1rem",
              })}
            >
              There is no post left to show!
            </div>
          )}

          {hasMorePosts && (
            <div
              class={flex({
                justify: "center",
                mt: "3rem",
              })}
            >
              <button
                onClick$={handleSeeMore}
                class={css({
                  bg: "amber.400",
                  color: "gray.800",
                  px: "3rem",
                  py: "1rem",
                  borderRadius: "8px",
                  fontSize: "1.05rem",
                  fontWeight: "semibold",
                  cursor: "pointer",
                  border: "none",
                  _hover: { transform: "translateY(-2px)" },
                  transition: "all 0.2s",
                })}
              >
                See More Blog Posts
              </button>
            </div>
          )}

          {!hasMorePosts && displayedPosts.length > 6 && (
            <div
              class={css({
                textAlign: "center",
                mt: "3rem",
                p: "2rem",
                color: "secondary",
                fontSize: "1rem",
              })}
            >
              You've reached the end of all blog posts!
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Blog - PTI",
  meta: [
    {
      name: "description",
      content:
        "Read the latest insights and updates about parking solutions and technology",
    },
  ],
};
