document.addEventListener('DOMContentLoaded', () => {
  const printOverlay = document.getElementById('print-overlay');
  const printStatus = document.getElementById('print-status');
  const printBar = document.getElementById('print-bar');
  const printText = document.getElementById('print-text');
  
  // Expose the trigger function globally
  window.triggerPdfEngine = function() {
    if (printOverlay.classList.contains('active')) return;
    
    // Set simulated text in the print sheet
    printText.innerText = 
`TOUIL KHALIL
BACKEND DEVELOPER
khaliltouilusthb@gmail.com
+213 696791171

PROFIL PROFESSIONNEL
Étudiant en informatique à l'USTHB...

EDUCATION
Licence en Informatique (2022 - 2025)

EXPÉRIENCE
• DZ Travel (Juin - Sep 2025)
• Univer Delivery (Juil - Août 2025)

PROJECTS
• Chat en temps réel
• E-commerce
• MGV Platform`;

    // Reset UI
    printStatus.innerText = 'Compiling resume... 0%';
    printBar.style.width = '0%';
    printBar.style.transition = 'none';
    
    // Activate overlay
    printOverlay.classList.add('active');
    
    // Force reflow and add transition back
    void printBar.offsetWidth;
    printBar.style.transition = 'width 2.2s linear';
    
    // Animate progress percentage
    let start = performance.now();
    const duration = 2200;
    
    function updateProgress(time) {
      let elapsed = time - start;
      let p = Math.min((elapsed / duration) * 100, 100);
      printStatus.innerText = `Compiling resume... ${Math.round(p)}%`;
      if (p < 100) {
        requestAnimationFrame(updateProgress);
      }
    }
    requestAnimationFrame(updateProgress);
    printBar.style.width = '100%';
    
    // When animation finishes
    setTimeout(() => {
      printStatus.innerText = '✓ Resume compiled';
      generateAndDownloadPDF();
      
      // Close overlay
      setTimeout(() => {
        printOverlay.classList.remove('active');
      }, 1500);
    }, 2200);
  };

  const footerBtn = document.getElementById('btn-download-cv-footer');
  if (footerBtn) {
    footerBtn.addEventListener('click', () => {
      window.triggerPdfEngine();
    });
  }

  function generateAndDownloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const ink = [13, 13, 18];
    const violetNeon = [139, 47, 255];
    const grayTxt = [80, 80, 90];
    const lightGray = [230, 230, 230];

    let currY = 25;
    const margin = 15;
    const pageWidth = 210;
    const contentWidth = pageWidth - 2 * margin;

    // Contact Box (Right side)
    doc.setFillColor(...ink);
    doc.rect(120, 0, 90, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('CONTACT', 125, 18);
    // line under contact
    doc.setDrawColor(255, 255, 255);
    doc.line(125, 20, 140, 20);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('khaliltouilusthb@gmail.com', 125, 26);
    doc.text('+213 696791171', 125, 32);
    doc.text('linkedin.com/in/khalil-touil', 125, 38);
    doc.text('github.com/khalil-t', 125, 44);

    // Header (Left side)
    doc.setTextColor(...ink);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.text('TOUIL KHALIL', 15, currY);
    currY += 8;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...violetNeon);
    doc.text('BACKEND DEVELOPER', 16, currY);
    currY += 20;

    function addSectionTitle(title) {
      if (currY > 270) { doc.addPage(); currY = 20; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...ink);
      doc.text(title, margin, currY);
      doc.setDrawColor(...violetNeon);
      doc.setLineWidth(1);
      doc.line(margin, currY + 2, margin + 15, currY + 2);
      currY += 10;
    }

    function checkPageBreak(requiredSpace) {
      if (currY + requiredSpace > 280) {
        doc.addPage();
        currY = 20;
      }
    }

    // PROFIL PROFESSIONNEL
    addSectionTitle('PROFIL PROFESSIONNEL (RÉSUMÉ) :');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...grayTxt);
    let profileText = "Étudiant en informatique à l’Université des Sciences et de la Technologie Houari Boumediene (USTHB), Alger – Algérie, je suis également développeur full-stack avec une expérience dans la conception et le développement d’applications web sécurisées. Spécialisé en technologies web modernes (Node.js, React, MongoDB) et passionné par le traitement et l’analyse de données à grande échelle, je souhaite intégrer un master en Big Data afin de renforcer mes compétences en architecture de données, pipelines de traitement, stockage et analyses avancées.";
    let splitProfile = doc.splitTextToSize(profileText, contentWidth);
    checkPageBreak(splitProfile.length * 5 + 5);
    doc.text(splitProfile, margin, currY);
    currY += splitProfile.length * 5 + 5;

    // EDUCATION
    addSectionTitle('EDUCATION:');
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...ink);
    doc.text('LICENCE EN INFORMATIQUE : 2022 - 2025', margin, currY);
    currY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    doc.text('Université des Sciences et de la Technologie Houari Boumediene (USTHB), Alger – Algérie', margin, currY);
    currY += 8;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('BACCALAURÉAT SCIENTIFIQUE – SPÉCIALITÉ MATHÉMATIQUES: 2021 - 2022', margin, currY);
    currY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    doc.text('Lycée KAHWADJI BOUALEM Bourouba, Alger-Algérie', margin, currY);
    currY += 10;

    // COMPÉTENCES
    addSectionTitle('COMPÉTENCES:');
    
    checkPageBreak(60);
    // COMPÉTENCES TECHNIQUES
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('COMPÉTENCES TECHNIQUES', margin, currY);
    currY += 6;
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('Back-end :', margin, currY);
    currY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    let backendTxt = doc.splitTextToSize('Node.js, Express.js, NestJS, REST API, Socket.io, Django, PostgreSQL, SQL, Conception & Modélisation', contentWidth);
    doc.text(backendTxt, margin, currY);
    currY += backendTxt.length * 5 + 1;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('Front-end :', margin, currY);
    currY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    doc.text('HTML, CSS, React, Next.js', margin, currY);
    currY += 6;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('Langages et outils:', margin, currY);
    currY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    let toolsTxt = doc.splitTextToSize('Git et Github, JavaScript (ES6+), TypeScript, C, Assembleur, Python', contentWidth);
    doc.text(toolsTxt, margin, currY);
    currY += toolsTxt.length * 5 + 5;

    checkPageBreak(35);
    // COMPÉTENCES TRANSVERSALES
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('COMPÉTENCES TRANSVERSALES', margin, currY);
    currY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    doc.text('• Développement de compétences en organisation, communication et travail en équipe.', margin, currY);
    currY += 5;
    doc.text('• Prise d’initiative dans les projets.', margin, currY);
    currY += 5;
    doc.text('• Activités extra-scolaires et participation en tant que membre du Micro Club à de', margin, currY);
    currY += 5;
    doc.text('  nombreux événements.', margin, currY);
    currY += 10;

    checkPageBreak(25);
    // LANGUES PARLÉES
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('LANGUES PARLÉES', margin, currY);
    currY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    doc.text('• Français : Niveau B2 (TCF certifié)', margin, currY);
    currY += 5;
    doc.text('• Anglais : bonne compréhension écrite et orale', margin, currY);
    currY += 10;

    // EXPÉRIENCE
    addSectionTitle('EXPÉRIENCE:');
    
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('STAGE – DZ TRAVEL | 01/06/2025 - 30/09/2025', margin, currY);
    currY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    let exp1 = "Contribution au développement de l’interface front-end de la plateforme en utilisant Next.js et TypeScript. Réalisation spécifique de la section blog, permettant aux utilisateurs de rédiger, publier et consulter des articles directement sur la plateforme.";
    let splitExp1 = doc.splitTextToSize(exp1, contentWidth);
    doc.text(splitExp1, margin, currY);
    currY += splitExp1.length * 5 + 6;

    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('STAGE – UNIVER DELIVERY | 01/07/2025 - 15/08/2025', margin, currY);
    currY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    let exp2 = "Contribution au développement du back-end en utilisant Node.js et Express.js. Amélioration du système de gestion des anomalies afin d’optimiser le processus de livraison et de garantir de meilleures conditions opérationnelles.";
    let splitExp2 = doc.splitTextToSize(exp2, contentWidth);
    doc.text(splitExp2, margin, currY);
    currY += splitExp2.length * 5 + 6;

    // PROJECTS
    addSectionTitle('PROJECTS:');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('CONCEPTION ET IMPLÉMENTATION D’APPLICATIONS WEB (2024/2025)', margin, currY);
    currY += 8;
    
    checkPageBreak(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('Application de chat en temps réel :', margin, currY);
    currY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    let proj1 = "Développement d’une messagerie multi-utilisateurs avec Socket.io pour la communication en temps réel.";
    let splitProj1 = doc.splitTextToSize(proj1, contentWidth);
    doc.text(splitProj1, margin, currY);
    currY += splitProj1.length * 5 + 4;

    checkPageBreak(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('Plateforme e-commerce :', margin, currY);
    currY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    let proj2 = "Conception d’une application complète permettant la consultation et l’achat de produits en ligne (React, Node.js, MongoDB).";
    let splitProj2 = doc.splitTextToSize(proj2, contentWidth);
    doc.text(splitProj2, margin, currY);
    currY += splitProj2.length * 5 + 4;

    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ink);
    doc.text('Plateforme MGV :', margin, currY);
    currY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayTxt);
    let proj3 = "Développement front-end d’une plateforme de gestion de hackathons (Next.js, REST APIs), permettant aux participants de s’inscrire, de suivre les défis et de gérer leur participation en ligne.";
    let splitProj3 = doc.splitTextToSize(proj3, contentWidth);
    doc.text(splitProj3, margin, currY);
    currY += splitProj3.length * 5 + 6;

    // Bottom Footer for all pages
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.5);
        doc.line(15, 280, 195, 280);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Touil Khalil Resume — Generated ${new Date().getFullYear()} — Page ${i} of ${pageCount}`, 15, 286);
    }

    // Trigger save download
    doc.save('khalil_touil_cv.pdf');
  }
});
