'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Instagram,
  MessageCircle,
  Mail
} from 'lucide-react';
import { type Project } from '@/lib/projects';
import { fetchLinksConfig, type LinksConfig } from '@/lib/api-client';

// Mapeamento de ícones sociais
const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  instagram: Instagram,
  whatsapp: MessageCircle,
  mail: Mail,
};

export default function LinksPage() {
  const [allProjectsData, setAllProjectsData] = useState<Project[]>([]);
  const [linksConfig, setLinksConfig] = useState<LinksConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { fetchProjects } = await import('@/lib/api-client');
        const projects = await fetchProjects().catch(async () => {
          const { allProjects } = await import('@/lib/projects');
          return allProjects;
        });

        const config = await fetchLinksConfig().catch(() => null);

        setAllProjectsData(projects);
        setLinksConfig(config);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // SEO Meta tags - atualizar dinamicamente
  useEffect(() => {
    if (!linksConfig) return;

    const seoTitle = linksConfig?.profile?.seo?.title || linksConfig?.profile?.title || 'WM3 Digital - Links';
    const seoDescription = linksConfig?.profile?.seo?.description || linksConfig?.profile?.description || 'Todos os nossos projetos e links em um só lugar';

    document.title = seoTitle;

    // Atualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seoDescription);
  }, [linksConfig]);

  // Ordem específica dos projetos
  const projectOrder = [
    'design-saas',
    'seo-blog',
    'socialflux',
    'metrify',
    'subhub',
    'funil-que-vende',
    'humantic'
  ];

  const sortProjects = (projects: Project[]): Project[] => {
    const ordered: Project[] = [];
    const unordered: Project[] = [];

    projectOrder.forEach(id => {
      const project = projects.find(p => p.id === id);
      if (project) ordered.push(project);
    });

    projects.forEach(project => {
      if (!projectOrder.includes(project.id)) {
        unordered.push(project);
      }
    });

    return [...ordered, ...unordered];
  };

  // Função para filtrar links visíveis e agendados
  const filterVisibleLinks = <T extends { visible?: boolean; scheduleStart?: string; scheduleEnd?: string }>(links: T[]): T[] => {
    const now = new Date();
    return links.filter(link => {
      // Verificar visibilidade
      if (link.visible === false) return false;

      // Verificar agendamento
      if (link.scheduleStart) {
        const start = new Date(link.scheduleStart);
        if (now < start) return false;
      }

      if (link.scheduleEnd) {
        const end = new Date(link.scheduleEnd);
        if (now > end) return false;
      }

      return true;
    });
  };

  const socialLinks = filterVisibleLinks(linksConfig?.socialLinks || []);
  const sortedProjects = filterVisibleLinks(sortProjects(allProjectsData));

  // Separar links destacados
  const featuredLinks = [...sortedProjects, ...socialLinks].filter(link => link.featured);
  const regularLinks = [...sortedProjects, ...socialLinks].filter(link => !link.featured);
  const allLinks = [...featuredLinks, ...regularLinks];

  // Aplicar tema personalizado
  const theme = linksConfig?.theme || {};
  const backgroundColor = theme.backgroundColor || '#97aac3';
  const buttonColor = theme.buttonColor || '#ffffff';
  const buttonTextColor = theme.buttonTextColor || '#000000';
  const textColor = theme.textColor || '#000000';
  const backgroundImage = theme.backgroundImage;
  const fontFamily = theme.fontFamily || 'Inter';

  const backgroundStyle = backgroundImage
    ? `url(${backgroundImage}) center/cover, linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`
    : `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: backgroundStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: '#ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#ffffff', fontWeight: 500 }}>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: '${fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
      <div style={{
        minHeight: '100vh',
        background: backgroundStyle,
        padding: '40px 20px',
        fontFamily: `'${fontFamily}', sans-serif`
      }}>
        <div style={{
          maxWidth: '580px',
          margin: '0 auto'
        }}>
          {/* Header - Perfil */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            {/* Avatar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                width: '96px',
                height: '96px',
                margin: '0 auto',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
                <Image
                  src={linksConfig?.profile?.avatar || '/wm3-icon.png'}
                  alt={linksConfig?.profile?.title || 'WM3 Digital'}
                  width={96}
                  height={96}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>

            {/* Nome */}
            <h1 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 12px 0',
              padding: '0',
              lineHeight: '1.4',
              letterSpacing: '-0.02em'
            }}>
              {linksConfig?.profile?.title || '@wm3digital'}
            </h1>

            {/* Descrição */}
            <p style={{
              fontSize: '14px',
              fontWeight: 400,
              color: textColor,
              opacity: 0.8,
              lineHeight: '1.6',
              padding: '0 20px',
              margin: 0
            }}>
              {linksConfig?.profile?.description || 'SaaS, automação e marketing digital com habilidades excepcionais em design de websites'}
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {allLinks.map((item, index) => {
              const isProject = 'id' in item && ('status' in item || 'category' in item);
              const isSocial = !isProject && 'icon' in item;

              type SocialLinkItem = { id: string; title: string; description?: string; url: string; icon: string; image?: string };

              const title = isProject ? (item as Project).title : 'title' in item ? (item as SocialLinkItem).title : '';
              const description = isProject ? (item as Project).description : 'description' in item ? (item as SocialLinkItem).description : '';
              const url = isProject
                ? ((item as Project).links?.live || (item as Project).links?.demo || (item as Project).links?.website || '#')
                : ('url' in item ? (item as SocialLinkItem).url : '#');
              const Icon = isSocial && 'icon' in item && typeof (item as SocialLinkItem).icon === 'string' ? iconMap[(item as SocialLinkItem).icon] : null;
              const itemImage = isProject ? (item as Project).image : ('image' in item ? (item as SocialLinkItem).image : undefined);

              return (
                <a
                  key={isProject ? (item as Project).id : ('id' in item ? (item as SocialLinkItem).id : index)}
                  href={url}
                  target={url.startsWith('http') ? '_blank' : undefined}
                  rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <div
                    className="link-button"
                    style={{
                      width: '100%',
                      backgroundColor: buttonColor,
                      borderRadius: '8px',
                      padding: '18px 20px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                      position: 'relative',
                      overflow: 'hidden',
                      ...('featured' in item && (item as { featured?: boolean }).featured ? {
                        border: `2px solid ${textColor}`,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      } : {})
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.93';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateY(0)';
                      const isFeatured = 'featured' in item && (item as { featured?: boolean }).featured;
                      e.currentTarget.style.boxShadow = isFeatured ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      textAlign: 'center'
                    }}>
                      {(Icon || itemImage) && (
                        <div style={{ flexShrink: 0 }}>
                          {itemImage ? (
                            <img src={itemImage} alt={title} style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '8px',
                              objectFit: 'cover'
                            }} />
                          ) : Icon ? (
                            <Icon size={22} style={{ color: buttonTextColor, flexShrink: 0 }} />
                          ) : null}
                        </div>
                      )}
                      <div style={{
                        flex: description ? 1 : 0,
                        minWidth: 0
                      }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: buttonTextColor,
                          lineHeight: '1.4',
                          marginBottom: description ? '4px' : 0,
                          letterSpacing: '-0.01em'
                        }}>
                          {title}
                        </div>
                        {description && (
                          <div style={{
                            fontSize: '13px',
                            fontWeight: 400,
                            color: buttonTextColor,
                            opacity: 0.75,
                            lineHeight: '1.5'
                          }}>
                            {description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: `1px solid ${textColor}33`
          }}>
            <p style={{
              fontSize: '13px',
              fontWeight: 500,
              color: textColor,
              opacity: 0.6,
              margin: 0
            }}>
              WM3 Digital © 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
