function Footer() {
    return (
      <footer style={styles.footer}>
        <div style={styles.container}>
          {/* Brand */}
          <div style={styles.section}>
            <h3 style={styles.logo}>AgroTask</h3>
            <p style={styles.text}>
              Smart farm task management with real-time weather insights.
            </p>
          </div>
  
          {/* Quick Links */}
          <div style={styles.section}>
            <h4 style={styles.heading}>Quick Links</h4>
            <p style={styles.link}>Dashboard</p>
            <p style={styles.link}>Tasks</p>
          </div>
  
          {/* Contact */}
          <div style={styles.section}>
            <h4 style={styles.heading}>Contact</h4>
            <p style={styles.text}>support@agrotask.com</p>
            <p style={styles.text}>India</p>
          </div>
        </div>
  
        <div style={styles.bottom}>
          © {new Date().getFullYear()} AgroTask. All rights reserved.
        </div>
      </footer>
    );
  }
  
  const styles = {
    footer: {
      background: "linear-gradient(135deg, #1e293b, #0f172a)",
      color: "#cbd5e1",
      marginTop: "40px"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px 20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "30px"
    },
    section: {
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    },
    logo: {
      color: "#ffffff",
      marginBottom: "10px"
    },
    heading: {
      color: "#ffffff",
      marginBottom: "10px"
    },
    text: {
      fontSize: "14px",
      lineHeight: "1.6"
    },
    link: {
      fontSize: "14px",
      cursor: "pointer"
    },
    bottom: {
      textAlign: "center",
      padding: "15px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      fontSize: "13px"
    }
  };
  
  export default Footer;
  