// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click event to nav links for smooth scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(46, 125, 50, 0.98)';
    } else {
        navbar.style.background = 'rgba(46, 125, 50, 0.95)';
    }
});

// Progress bars animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Counter animation for impact statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 200; // Adjust speed here
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Observer for progress bars
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            progressObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer for fade-in animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize observers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe campaigns section for progress bars
    const campaignsSection = document.querySelector('.campaigns');
    if (campaignsSection) {
        progressObserver.observe(campaignsSection);
    }
    
    // Observe impact section for counters
    const impactSection = document.querySelector('.impact');
    if (impactSection) {
        counterObserver.observe(impactSection);
    }
    
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.about-card, .campaign-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeObserver.observe(card);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple form validation
        if (!name || !email || !message) {
            showNotification('Mohon lengkapi semua field!', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Terima kasih! Pesan Anda telah terkirim.', 'success');
        contactForm.reset();
    });
}

// Campaign join buttons
const joinButtons = document.querySelectorAll('.campaign-card .btn-primary');
joinButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const campaigns = ['1 Juta Pohon', 'Air Bersih', 'Zero Waste'];
        const campaignName = campaigns[index];
        showNotification(`Terima kasih telah bergabung dengan kampanye ${campaignName}!`, 'success');
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Lazy loading for images (if any images are added later)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(46, 125, 50, 0.98)';
    } else {
        navbar.style.background = 'rgba(46, 125, 50, 0.95)';
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Close notification if present
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Article Modal Functions
const articles = {
    article1: {
        title: "Mengapa Menanam Pohon Sangat Penting untuk Masa Depan Bumi?",
        category: "Penghijauan",
        date: "25 Oktober 2025",
        readTime: "5 menit baca",
        content: `
            <h3>Mengapa Pohon Adalah Pahlawan Lingkungan?</h3>
            <p>Pohon adalah salah satu makhluk hidup paling penting di planet ini. Mereka tidak hanya memberikan keindahan alam, tetapi juga berperan vital dalam menjaga keseimbangan ekosistem bumi. Setiap pohon yang ditanam adalah investasi untuk masa depan planet kita.</p>
            
            <h3>Manfaat Luar Biasa dari Pohon</h3>
            <p><strong>1. Penyerap Karbon Dioksida:</strong> Satu pohon dewasa dapat menyerap hingga 22 kg CO2 per tahun. Bayangkan dampaknya jika kita menanam 1 juta pohon!</p>
            
            <p><strong>2. Penghasil Oksigen:</strong> Pohon menghasilkan oksigen melalui proses fotosintesis. Satu pohon dapat menghasilkan oksigen yang cukup untuk 2 orang dewasa selama setahun.</p>
            
            <p><strong>3. Filter Udara Alami:</strong> Pohon menyaring polutan udara seperti debu, asap, dan gas beracun, memberikan kita udara yang lebih bersih untuk bernapas.</p>
            
            <p><strong>4. Pengatur Suhu:</strong> Pohon memberikan keteduhan dan mendinginkan udara melalui proses evapotranspirasi, mengurangi efek urban heat island.</p>
            
            <h3>Krisis Deforestasi di Indonesia</h3>
            <p>Indonesia kehilangan sekitar 6 juta hektar hutan setiap tahunnya. Ini setara dengan kehilangan area seluas 17 lapangan sepak bola setiap menitnya! Deforestasi ini menyebabkan:</p>
            
            <ul>
                <li>Peningkatan emisi gas rumah kaca</li>
                <li>Hilangnya habitat satwa langka</li>
                <li>Erosi tanah dan banjir</li>
                <li>Perubahan iklim regional</li>
            </ul>
            
            <h3>Bagaimana Anda Bisa Berkontribusi?</h3>
            <p>Setiap orang dapat berkontribusi dalam gerakan penghijauan ini:</p>
            
            <ul>
                <li><strong>Bergabung dengan kampanye 1 Juta Pohon:</strong> Donasi atau langsung berpartisipasi dalam kegiatan penanaman</li>
                <li><strong>Tanam pohon di halaman rumah:</strong> Mulai dari pohon buah-buahan atau tanaman hias</li>
                <li><strong>Adopsi pohon:</strong> Sponsor perawatan pohon yang telah ditanam</li>
                <li><strong>Edukasi keluarga:</strong> Ajarkan pentingnya pelestarian lingkungan kepada anak-anak</li>
            </ul>
            
            <p>Mari bersama-sama menciptakan masa depan yang lebih hijau. Setiap pohon yang kita tanam hari ini adalah warisan untuk generasi mendatang. Bergabunglah dengan kampanye 1 Juta Pohon dan jadilah bagian dari solusi!</p>
        `
    },
    article2: {
        title: "Krisis Air Bersih di Indonesia: Fakta dan Solusi",
        category: "Air Bersih",
        date: "22 Oktober 2025",
        readTime: "7 menit baca",
        content: `
            <h3>Situasi Krisis Air Bersih di Indonesia</h3>
            <p>Indonesia, negara dengan ribuan pulau dan sumber daya air yang melimpah, ironisnya masih menghadapi tantangan besar dalam penyediaan air bersih. Data menunjukkan bahwa lebih dari 23 juta penduduk Indonesia masih belum memiliki akses terhadap air minum yang layak dan aman.</p>
            
            <h3>Fakta Mengejutkan tentang Air di Indonesia</h3>
            <p><strong>1. Akses Terbatas:</strong> Hanya 72% penduduk Indonesia yang memiliki akses terhadap air minum yang aman menurut standar WHO.</p>
            
            <p><strong>2. Kualitas Air Menurun:</strong> 68% sungai di Indonesia tercemar oleh limbah industri dan domestik.</p>
            
            <p><strong>3. Ketimpangan Regional:</strong> Akses air bersih di daerah terpencil hanya 30%, jauh tertinggal dari perkotaan yang mencapai 85%.</p>
            
            <p><strong>4. Dampak Kesehatan:</strong> 100,000 anak balita meninggal setiap tahun akibat penyakit yang berhubungan dengan air kotor.</p>
            
            <h3>Penyebab Krisis Air Bersih</h3>
            <ul>
                <li><strong>Pencemaran Industri:</strong> Limbah pabrik yang dibuang langsung ke sungai tanpa pengolahan</li>
                <li><strong>Sampah Plastik:</strong> Pencemaran sungai oleh sampah plastik yang sulit terurai</li>
                <li><strong>Pertambangan Ilegal:</strong> Kegiatan pertambangan yang merusak sumber air</li>
                <li><strong>Deforestasi:</strong> Hilangnya hutan yang berfungsi sebagai penyimpan air alami</li>
                <li><strong>Perubahan Iklim:</strong> Pola curah hujan yang tidak teratur</li>
            </ul>
            
            <h3>Dampak Krisis Air Bersih</h3>
            <p>Krisis air bersih tidak hanya mempengaruhi kesehatan, tetapi juga:</p>
            
            <ul>
                <li><strong>Ekonomi:</strong> Biaya kesehatan meningkat, produktivitas menurun</li>
                <li><strong>Pendidikan:</strong> Anak-anak, terutama perempuan, terpaksa mengambil air daripada sekolah</li>
                <li><strong>Sosial:</strong> Konflik antar komunitas karena perebutan sumber air</li>
                <li><strong>Lingkungan:</strong> Ekosistem air tawar terancam punah</li>
            </ul>
            
            <h3>Solusi yang Sedang Dilakukan</h3>
            <p><strong>1. Program Pembersihan Sungai:</strong> Kampanye kami telah membersihkan 45 sungai di berbagai daerah dengan melibatkan masyarakat lokal.</p>
            
            <p><strong>2. Teknologi Pengolahan Air:</strong> Instalasi sistem penyaringan air sederhana yang dapat digunakan oleh masyarakat.</p>
            
            <p><strong>3. Edukasi Masyarakat:</strong> Program sosialisasi tentang pentingnya menjaga kebersihan sumber air.</p>
            
            <p><strong>4. Kerjasama Multi-Stakeholder:</strong> Kolaborasi dengan pemerintah, swasta, dan LSM untuk solusi yang berkelanjutan.</p>
            
            <h3>Bagaimana Anda Bisa Membantu?</h3>
            <ul>
                <li><strong>Hemat Air:</strong> Gunakan air secukupnya dan perbaiki kebocoran</li>
                <li><strong>Jangan Buang Sampah ke Sungai:</strong> Buang sampah pada tempatnya</li>
                <li><strong>Bergabung Aksi Bersih-Bersih:</strong> Ikuti kegiatan pembersihan sungai dan pantai</li>
                <li><strong>Donasi:</strong> Dukung program penyediaan air bersih untuk daerah terpencil</li>
                <li><strong>Gunakan Produk Ramah Lingkungan:</strong> Kurangi penggunaan deterjen dan bahan kimia</li>
            </ul>
            
            <p>Air adalah hak dasar setiap manusia. Mari bersama-sama menjaga dan melestarikan sumber daya air untuk generasi mendatang. Bergabunglah dengan kampanye Air Bersih kami dan jadilah bagian dari solusi!</p>
        `
    },
    article3: {
        title: "Panduan Praktis Memulai Gaya Hidup Zero Waste",
        category: "Zero Waste",
        date: "20 Oktober 2025",
        readTime: "6 menit baca",
        content: `
            <h3>Apa Itu Zero Waste?</h3>
            <p>Zero Waste adalah filosofi hidup yang bertujuan mengurangi sampah seminimal mungkin dengan mengoptimalkan penggunaan ulang dan daur ulang. Konsep ini bukan hanya tentang tidak membuang sampah, tetapi juga tentang mengubah pola konsumsi kita secara fundamental.</p>
            
            <h3>Mengapa Zero Waste Penting?</h3>
            <p>Indonesia memproduksi 64 juta ton sampah per tahun, dan hanya 7% yang didaur ulang. Sisanya berakhir di TPA atau bahkan laut. Setiap hari, kita menghasilkan rata-rata 0,8 kg sampah per orang. Bayangkan dampaknya jika 270 juta penduduk Indonesia mengurangi sampah mereka!</p>
            
            <h3>Prinsip 5R dalam Zero Waste</h3>
            
            <p><strong>1. REFUSE (Tolak)</strong></p>
            <ul>
                <li>Tolak sedotan plastik, gunakan sedotan stainless steel atau bambu</li>
                <li>Tolak kantong plastik, bawa tas belanja sendiri</li>
                <li>Tolak brosur atau sample gratis yang tidak perlu</li>
                <li>Tolak kemasan berlebihan saat berbelanja</li>
            </ul>
            
            <p><strong>2. REDUCE (Kurangi)</strong></p>
            <ul>
                <li>Kurangi konsumsi barang-barang yang tidak penting</li>
                <li>Pilih kualitas daripada kuantitas</li>
                <li>Kurangi penggunaan air dan listrik</li>
                <li>Beli sesuai kebutuhan, bukan keinginan</li>
            </ul>
            
            <p><strong>3. REUSE (Gunakan Kembali)</strong></p>
            <ul>
                <li>Gunakan botol kaca bekas sebagai wadah penyimpanan</li>
                <li>Ubah kemeja lama menjadi kain lap</li>
                <li>Manfaatkan kertas bekas untuk catatan</li>
                <li>Donasikan barang yang masih layak pakai</li>
            </ul>
            
            <p><strong>4. RECYCLE (Daur Ulang)</strong></p>
            <ul>
                <li>Pisahkan sampah organik dan anorganik</li>
                <li>Bawa sampah plastik ke bank sampah</li>
                <li>Daur ulang kertas dan kardus</li>
                <li>Kompos sampah organik menjadi pupuk</li>
            </ul>
            
            <p><strong>5. ROT (Kompos)</strong></p>
            <ul>
                <li>Buat komposter dari sampah organik</li>
                <li>Gunakan kompos untuk tanaman di rumah</li>
                <li>Kurangi penggunaan pupuk kimia</li>
                <li>Dukung sistem composting komunitas</li>
            </ul>
            
            <h3>Langkah Praktis Memulai Zero Waste</h3>
            
            <p><strong>Di Rumah:</strong></p>
            <ul>
                <li>Ganti produk sekali pakai dengan yang dapat digunakan berulang</li>
                <li>Buat DIY pembersih dari bahan alami</li>
                <li>Belanja di pasar tradisional dengan wadah sendiri</li>
                <li>Budayakan makan habis, tidak menyisakan makanan</li>
            </ul>
            
            <p><strong>Di Kantor:</strong></p>
            <ul>
                <li>Bawa botol minum dan tumbler sendiri</li>
                <li>Print dokumen hanya jika diperlukan</li>
                <li>Gunakan kedua sisi kertas</li>
                <li>Bawa bekal makanan dengan wadah reusable</li>
            </ul>
            
            <p><strong>Saat Berbelanja:</strong></p>
            <ul>
                <li>Buat daftar belanja untuk menghindari impulse buying</li>
                <li>Pilih produk dengan kemasan minimal</li>
                <li>Beli dalam jumlah yang tepat sesuai kebutuhan</li>
                <li>Pilih produk lokal untuk mengurangi jejak karbon</li>
            </ul>
            
            <h3>Tantangan dan Solusi</h3>
            
            <p><strong>Tantangan:</strong> "Zero waste terlalu ribet dan mahal"</p>
            <p><strong>Solusi:</strong> Mulai dengan langkah kecil. Investasi awal mungkin lebih besar, tapi jangka panjang lebih hemat.</p>
            
            <p><strong>Tantangan:</strong> "Sulit menemukan produk ramah lingkungan"</p>
            <p><strong>Solusi:</strong> Mulai dengan DIY atau cari komunitas zero waste untuk sharing informasi.</p>
            
            <p><strong>Tantangan:</strong> "Keluarga tidak mendukung"</p>
            <p><strong>Solusi:</strong> Beri contoh nyata dan jelaskan manfaatnya secara perlahan.</p>
            
            <h3>Dampak Positif Zero Waste</h3>
            <ul>
                <li><strong>Lingkungan:</strong> Mengurangi polusi dan emisi gas rumah kaca</li>
                <li><strong>Ekonomi:</strong> Menghemat pengeluaran jangka panjang</li>
                <li><strong>Kesehatan:</strong> Terhindar dari bahan kimia berbahaya</li>
                <li><strong>Sosial:</strong> Menciptakan komunitas yang peduli lingkungan</li>
            </ul>
            
            <p>Gaya hidup zero waste bukan tentang kesempurnaan, tetapi tentang membuat pilihan yang lebih baik setiap hari. Mulai dengan satu perubahan kecil hari ini, dan secara bertahap tingkatkan komitmen Anda. Bergabunglah dengan 8,000 keluarga lain yang telah memulai perjalanan zero waste mereka!</p>
        `
    }
};

function openArticleModal(articleId) {
    const modal = document.getElementById('articleModal');
    const modalContent = document.getElementById('modalContent');
    const article = articles[articleId];
    
    if (article) {
        modalContent.innerHTML = `
            <div class="modal-article">
                <h2>${article.title}</h2>
                <div class="article-meta">
                    <span class="article-category">${article.category}</span>
                    <span class="article-date"><i class="fas fa-calendar"></i> ${article.date}</span>
                    <span class="article-read-time"><i class="fas fa-clock"></i> ${article.readTime}</span>
                </div>
                ${article.content}
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="scrollToSection('campaigns'); closeArticleModal();">Bergabung Sekarang</button>
                </div>
            </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeArticleModal() {
    const modal = document.getElementById('articleModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('articleModal');
    if (e.target === modal) {
        closeArticleModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeArticleModal();
    }
});

// Initialize when page loads
window.addEventListener('load', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize progress bars immediately if campaigns section is visible
    const campaignsSection = document.querySelector('.campaigns');
    const rect = campaignsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        animateProgressBars();
    }
});