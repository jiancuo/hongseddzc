// 网站交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 基础功能
    initCarousel();
    initNavbarScroll();
    initAnimations();
    
    // 页面特定功能
    if (document.querySelector('.stories-list-section')) {
        initStoriesPage();
    }
    
    if (document.querySelector('.gallery-section')) {
        initGalleryPage();
    }
    
    if (document.querySelector('.contact-form')) {
        initContactForm();
    }
});

// 轮播图功能
function initCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    if (carouselItems.length === 0) return;
    
    let currentIndex = 0;
    
    // 显示指定索引的轮播项
    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
        currentIndex = index;
    }
    
    // 下一张
    function nextSlide() {
        let newIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(newIndex);
    }
    
    // 上一张
    function prevSlide() {
        let newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(newIndex);
    }
    
    // 绑定事件
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    
    // 自动轮播
    setInterval(nextSlide, 5000);
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(139, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #8B0000, #B22222)';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// 页面动画
function initAnimations() {
    // 观察器配置
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加观察
    const animatedElements = document.querySelectorAll('.feature-card, .story-card, .team-member, .hero-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 故事页面功能
function initStoriesPage() {
    // 故事筛选功能
    const filterButtons = document.querySelectorAll('.stories-filter .filter-btn');
    const storyCards = document.querySelectorAll('.story-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新活跃按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // 筛选故事
            storyCards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 阅读更多功能
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const storyDetail = button.previousElementSibling;
            const isVisible = storyDetail.style.display === 'block';
            
            storyDetail.style.display = isVisible ? 'none' : 'block';
            button.textContent = isVisible ? '阅读全文' : '收起内容';
        });
    });
}

// 图库页面功能
function initGalleryPage() {
    // 图库筛选功能
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 图片模态框功能
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-caption');
                const title = caption.querySelector('h4').textContent;
                const description = caption.querySelector('p').textContent;
                
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // 关闭模态框
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// 联系表单功能
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 这里可以添加表单验证
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData);
            
            // 模拟表单提交成功
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // 在实际应用中，这里应该发送数据到服务器
            console.log('表单数据:', formValues);
        });
    }
}

// 平滑滚动
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}