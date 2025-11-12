'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Link as LinkIcon, LogOut, RefreshCw, Eye, EyeOff, GripVertical, ExternalLink, QrCode, TrendingUp, Palette, Settings } from 'lucide-react';
import { Project } from '@/lib/projects';
import { fetchProjects, createProject, updateProject, deleteProjectById } from '@/lib/api-client';
import { fetchLinksConfig, updateLinksConfig, type LinksConfig } from '@/lib/api-client';

export default function AdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [linksConfig, setLinksConfig] = useState<LinksConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingLinks, setEditingLinks] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'links'>('projects');
  const [previewMode, setPreviewMode] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [syncingProjects, setSyncingProjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
      loadData();
    } catch {
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsData, linksData] = await Promise.all([
        fetchProjects(),
        fetchLinksConfig().catch(() => null)
      ]);
      setProjects(projectsData);
      setLinksConfig(linksData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      const errorMessage = error instanceof Error ? error.message : '';
      if (errorMessage.includes('401') || errorMessage.includes('Não autorizado')) {
        router.push('/login');
        return;
      }
      alert('Erro ao carregar dados. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async (project: Project) => {
    try {
      if (project.id && projects.find(p => p.id === project.id)) {
        await updateProject(project);
      } else {
        await createProject(project);
      }
      await loadData();
      setEditingProject(null);
      alert('Projeto salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      alert('Erro ao salvar projeto');
    }
  };

  const handleSyncProject = async (projectId: string) => {
    setSyncingProjects(prev => new Set(prev).add(projectId));
    try {
      const response = await fetch(`/api/projects/${projectId}/sync`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao sincronizar');
      }

      const result = await response.json();
      alert(`Projeto "${result.project.title}" sincronizado com sucesso!`);
      loadData(); // Recarregar dados
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      alert(`Erro ao sincronizar: ${errorMessage}`);
    } finally {
      setSyncingProjects(prev => {
        const next = new Set(prev);
        next.delete(projectId);
        return next;
      });
    }
  };

  const handleSyncAllProjects = async () => {
    if (!confirm('Deseja sincronizar todos os projetos com suas páginas oficiais?')) {
      return;
    }

    setSyncingProjects(new Set(['all']));
    try {
      const response = await fetch('/api/projects/sync', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao sincronizar');
      }

      const result = await response.json();
      alert(`Sincronização concluída!\n${result.updated} projetos atualizados.\n${result.errors} erros.`);
      loadData(); // Recarregar dados
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      alert(`Erro ao sincronizar: ${errorMessage}`);
    } finally {
      setSyncingProjects(new Set());
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este projeto?')) return;
    
    try {
      await deleteProjectById(id);
      await loadData();
      alert('Projeto deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      alert('Erro ao deletar projeto');
    }
  };

  const handleSaveLinks = async () => {
    if (!linksConfig) return;
    
    try {
      await updateLinksConfig(linksConfig);
      setEditingLinks(false);
      alert('Configuração de links salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      alert('Erro ao salvar configuração');
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Painel de Administração
              </h1>
              <p className="text-muted-foreground">
                Gerencie projetos e configure a página de links
              </p>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'projects'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Projetos
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'links'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Página de Links
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Projetos</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleSyncAllProjects}
                  disabled={syncingProjects.has('all')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${syncingProjects.has('all') ? 'animate-spin' : ''}`} />
                  Sincronizar Todos
                </button>
                <button
                  onClick={() => setEditingProject({
                    id: '',
                    title: '',
                    description: '',
                    tags: [],
                    status: 'Disponível',
                    category: 'projeto',
                    links: {}
                  })}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Novo Projeto
                </button>
              </div>
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 border rounded-lg bg-card"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                        project.status === 'Disponível' ? 'bg-green-500/20 text-green-700' :
                        project.status === 'Early Adopters' ? 'bg-yellow-500/20 text-yellow-700' :
                        'bg-blue-500/20 text-blue-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {(project.links.website || project.links.live) && (
                        <button
                          onClick={() => handleSyncProject(project.id)}
                          disabled={syncingProjects.has(project.id)}
                          className="p-2 hover:bg-blue-500/10 rounded text-blue-600 disabled:opacity-50"
                          title="Sincronizar da página oficial"
                        >
                          <RefreshCw className={`w-4 h-4 ${syncingProjects.has(project.id) ? 'animate-spin' : ''}`} />
                        </button>
                      )}
                      <button
                        onClick={() => setEditingProject(project)}
                        className="p-2 hover:bg-accent rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 hover:bg-destructive/10 rounded text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-accent rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Edit Project Modal */}
            {editingProject && (
              <ProjectEditor
                project={editingProject}
                onSave={handleSaveProject}
                onCancel={() => setEditingProject(null)}
              />
            )}
          </div>
        )}

        {/* Links Tab */}
        {activeTab === 'links' && linksConfig && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Configuração da Página de Links</h2>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    const QRCode = (await import('qrcode')).default;
                    const canvas = document.createElement('canvas');
                    const url = `${window.location.origin}/links`;
                    await QRCode.toCanvas(canvas, url, { width: 300 });
                    const qrWindow = window.open('', '_blank');
                    if (qrWindow) {
                      qrWindow.document.write(`
                        <html>
                          <head><title>QR Code - Links</title></head>
                          <body style="display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;flex-direction:column;font-family:sans-serif;">
                            <h2>QR Code da Página de Links</h2>
                            ${canvas.outerHTML}
                            <p style="margin-top:16px;color:#666;">${url}</p>
                            <button onclick="window.print()" style="margin-top:16px;padding:8px 16px;cursor:pointer;background:#000;color:#fff;border:none;border-radius:8px;">Imprimir</button>
                          </body>
                        </html>
                      `);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  QR Code
                </button>
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {previewMode ? 'Fechar Preview' : 'Preview'}
                </button>
                <a
                  href="/links"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver Página
                </a>
                <button
                  onClick={() => setEditingLinks(!editingLinks)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {editingLinks ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  {editingLinks ? 'Cancelar' : 'Editar'}
                </button>
              </div>
            </div>

            {/* Preview Mode */}
            {previewMode && (
              <div className="border-2 border-dashed border-primary/50 rounded-lg p-4 bg-muted/30">
                <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 mb-3">
                      <img
                        src={linksConfig.profile.avatar || '/wm3-icon.png'}
                        alt={linksConfig.profile.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{linksConfig.profile.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{linksConfig.profile.description}</p>
                  </div>
                  <div className="space-y-2">
                    {linksConfig.socialLinks.slice(0, 3).map((link, idx) => (
                      <div key={idx} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
                        {link.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {editingLinks ? (
              <LinksEditor
                config={linksConfig}
                onChange={setLinksConfig}
                onSave={handleSaveLinks}
                onCancel={() => setEditingLinks(false)}
              />
            ) : (
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-lg font-bold mb-4">Preview</h3>
                <div className="space-y-2">
                  <p><strong>Título:</strong> {linksConfig.profile.title}</p>
                  <p><strong>Descrição:</strong> {linksConfig.profile.description}</p>
                  <p><strong>Links Sociais:</strong> {linksConfig.socialLinks.length}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente de edição de projeto
function ProjectEditor({ 
  project, 
  onSave, 
  onCancel 
}: { 
  project: Project; 
  onSave: (p: Project) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Project>(project);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4">
          {project.id ? 'Editar Projeto' : 'Novo Projeto'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="ex: meu-projeto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="Disponível">Disponível</option>
                <option value="Early Adopters">Early Adopters</option>
                <option value="Em Desenvolvimento">Em Desenvolvimento</option>
                <option value="Beta">Beta</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Em Breve">Em Breve</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'servico' | 'projeto' })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="projeto">Projeto</option>
                <option value="servico">Serviço</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (separadas por vírgula)</label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData({ 
                ...formData, 
                tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
              })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Tag1, Tag2, Tag3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preço (opcional)</label>
            <input
              type="text"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="A partir de R$ 1.500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link Live</label>
            <input
              type="text"
              value={formData.links.live || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                links: { ...formData.links, live: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="/servicos/meu-projeto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link Demo (opcional)</label>
            <input
              type="text"
              value={formData.links.demo || ''}
              onChange={(e) => setFormData({
                ...formData,
                links: { ...formData.links, demo: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://demo.exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail (URL da imagem)</label>
            <input
              type="text"
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-20 h-20 rounded-lg object-cover border"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1">
                <input
                  type="checkbox"
                  checked={formData.visible !== false}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                  className="w-4 h-4"
                />
                Visível
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                Link Destacado
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Agendamento - Início</label>
              <input
                type="datetime-local"
                value={formData.scheduleStart || ''}
                onChange={(e) => setFormData({ ...formData, scheduleStart: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Agendamento - Fim</label>
              <input
                type="datetime-local"
                value={formData.scheduleEnd || ''}
                onChange={(e) => setFormData({ ...formData, scheduleEnd: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {(formData.clicks !== undefined || formData.views !== undefined) && (
            <div className="p-4 border rounded-lg bg-muted/30">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Analytics
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Cliques:</span>
                  <strong className="ml-2">{formData.clicks || 0}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground">Visualizações:</span>
                  <strong className="ml-2">{formData.views || 0}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => onSave(formData)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <Save className="w-4 h-4" />
            Salvar
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-accent"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Componente de edição de links
function LinksEditor({
  config,
  onChange,
  onSave,
  onCancel
}: {
  config: LinksConfig;
  onChange: (config: LinksConfig) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [localConfig, setLocalConfig] = useState<LinksConfig>(config);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const updateConfig = (updates: Partial<LinksConfig>) => {
    const newConfig = { ...localConfig, ...updates };
    setLocalConfig(newConfig);
    onChange(newConfig);
  };

  const addSocialLink = () => {
    const newLink = {
      id: `social-${Date.now()}`,
      title: 'Novo Link',
      url: '',
      icon: 'instagram',
      description: ''
    };
    updateConfig({
      socialLinks: [...localConfig.socialLinks, newLink]
    });
  };

  const removeSocialLink = (id: string) => {
    updateConfig({
      socialLinks: localConfig.socialLinks.filter(link => link.id !== id)
    });
  };

  const updateSocialLink = (id: string, updates: Partial<LinksConfig['socialLinks'][0]>) => {
    updateConfig({
      socialLinks: localConfig.socialLinks.map(link =>
        link.id === id ? { ...link, ...updates } : link
      )
    });
  };

  const moveSocialLink = (index: number, direction: 'up' | 'down') => {
    const newLinks = [...localConfig.socialLinks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newLinks.length) {
      [newLinks[index], newLinks[targetIndex]] = [newLinks[targetIndex], newLinks[index]];
      updateConfig({ socialLinks: newLinks });
    }
  };

  return (
    <div className="space-y-6">
      {/* Perfil */}
      <div className="p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Perfil
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={localConfig.profile.title}
              onChange={(e) => updateConfig({
                profile: { ...localConfig.profile, title: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="WM3 Digital"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              value={localConfig.profile.description}
              onChange={(e) => updateConfig({
                profile: { ...localConfig.profile, description: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              placeholder="SaaS, automação e marketing digital..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Avatar (URL da imagem)</label>
            <input
              type="text"
              value={localConfig.profile.avatar || ''}
              onChange={(e) => updateConfig({
                profile: { ...localConfig.profile, avatar: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="/wm3-icon.png"
            />
            {localConfig.profile.avatar && (
              <div className="mt-2">
                <img
                  src={localConfig.profile.avatar}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover border"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Personalização Visual (Theme) */}
      <div className="p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Personalização Visual
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cor de Fundo</label>
              <input
                type="color"
                value={localConfig.theme?.backgroundColor || '#97aac3'}
                onChange={(e) => updateConfig({
                  theme: { ...localConfig.theme, backgroundColor: e.target.value }
                })}
                className="w-full h-10 px-1 py-1 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cor dos Botões</label>
              <input
                type="color"
                value={localConfig.theme?.buttonColor || '#ffffff'}
                onChange={(e) => updateConfig({
                  theme: { ...localConfig.theme, buttonColor: e.target.value }
                })}
                className="w-full h-10 px-1 py-1 border rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cor do Texto dos Botões</label>
              <input
                type="color"
                value={localConfig.theme?.buttonTextColor || '#000000'}
                onChange={(e) => updateConfig({
                  theme: { ...localConfig.theme, buttonTextColor: e.target.value }
                })}
                className="w-full h-10 px-1 py-1 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cor do Texto</label>
              <input
                type="color"
                value={localConfig.theme?.textColor || '#000000'}
                onChange={(e) => updateConfig({
                  theme: { ...localConfig.theme, textColor: e.target.value }
                })}
                className="w-full h-10 px-1 py-1 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Imagem de Fundo (URL)</label>
            <input
              type="text"
              value={localConfig.theme?.backgroundImage || ''}
              onChange={(e) => updateConfig({
                theme: { ...localConfig.theme, backgroundImage: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://exemplo.com/background.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fonte</label>
            <select
              value={localConfig.theme?.fontFamily || 'Inter'}
              onChange={(e) => updateConfig({
                theme: { ...localConfig.theme, fontFamily: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          SEO & Analytics
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título SEO</label>
            <input
              type="text"
              value={localConfig.profile.seo?.title || ''}
              onChange={(e) => updateConfig({
                profile: {
                  ...localConfig.profile,
                  seo: { ...localConfig.profile.seo, title: e.target.value }
                }
              })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="WM3 Digital - Links"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descrição SEO</label>
            <textarea
              value={localConfig.profile.seo?.description || ''}
              onChange={(e) => updateConfig({
                profile: {
                  ...localConfig.profile,
                  seo: { ...localConfig.profile.seo, description: e.target.value }
                }
              })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={2}
              placeholder="Todos os nossos projetos e links em um só lugar"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Palavras-chave (separadas por vírgula)</label>
            <input
              type="text"
              value={localConfig.profile.seo?.keywords || ''}
              onChange={(e) => updateConfig({
                profile: {
                  ...localConfig.profile,
                  seo: { ...localConfig.profile.seo, keywords: e.target.value }
                }
              })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="saas, marketing digital, automação"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Google Analytics ID (opcional)</label>
            <input
              type="text"
              value={localConfig.analytics?.googleAnalyticsId || ''}
              onChange={(e) => updateConfig({
                analytics: {
                  ...localConfig.analytics,
                  googleAnalyticsId: e.target.value,
                  enabled: !!e.target.value
                }
              })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="G-XXXXXXXXXX"
            />
          </div>
        </div>
      </div>

      {/* Links Sociais */}
      <div className="p-6 border rounded-lg bg-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Links Sociais
          </h3>
          <button
            onClick={addSocialLink}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm"
          >
            <Plus className="w-4 h-4" />
            Adicionar Link
          </button>
        </div>
        <div className="space-y-3">
          {localConfig.socialLinks.map((link, index) => (
            <div key={link.id} className="p-4 border rounded-lg bg-muted/30">
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1 pt-2">
                  <button
                    onClick={() => moveSocialLink(index, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:bg-accent rounded disabled:opacity-30"
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSocialLink(index, 'down')}
                    disabled={index === localConfig.socialLinks.length - 1}
                    className="p-1 hover:bg-accent rounded disabled:opacity-30"
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Título</label>
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => updateSocialLink(link.id, { title: e.target.value })}
                        className="w-full px-2 py-1.5 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Ícone</label>
                      <select
                        value={link.icon || 'instagram'}
                        onChange={(e) => updateSocialLink(link.id, { icon: e.target.value })}
                        className="w-full px-2 py-1.5 border rounded text-sm"
                      >
                        <option value="instagram">Instagram</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="mail">E-mail</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">URL</label>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => updateSocialLink(link.id, { url: e.target.value })}
                      className="w-full px-2 py-1.5 border rounded text-sm"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Descrição (opcional)</label>
                    <input
                      type="text"
                      value={link.description || ''}
                      onChange={(e) => updateSocialLink(link.id, { description: e.target.value })}
                      className="w-full px-2 py-1.5 border rounded text-sm"
                      placeholder="Descrição do link"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Thumbnail (URL da imagem)</label>
                    <input
                      type="text"
                      value={link.image || ''}
                      onChange={(e) => updateSocialLink(link.id, { image: e.target.value })}
                      className="w-full px-2 py-1.5 border rounded text-sm"
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Agendamento - Início</label>
                      <input
                        type="datetime-local"
                        value={link.scheduleStart || ''}
                        onChange={(e) => updateSocialLink(link.id, { scheduleStart: e.target.value })}
                        className="w-full px-2 py-1.5 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Agendamento - Fim</label>
                      <input
                        type="datetime-local"
                        value={link.scheduleEnd || ''}
                        onChange={(e) => updateSocialLink(link.id, { scheduleEnd: e.target.value })}
                        className="w-full px-2 py-1.5 border rounded text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 text-xs font-medium">
                      <input
                        type="checkbox"
                        checked={link.visible !== false}
                        onChange={(e) => updateSocialLink(link.id, { visible: e.target.checked })}
                        className="w-4 h-4"
                      />
                      Visível
                    </label>
                    <label className="flex items-center gap-2 text-xs font-medium">
                      <input
                        type="checkbox"
                        checked={link.featured || false}
                        onChange={(e) => updateSocialLink(link.id, { featured: e.target.checked })}
                        className="w-4 h-4"
                      />
                      Destacado
                    </label>
                  </div>
                  {(link.clicks !== undefined) && (
                    <div className="text-xs text-muted-foreground">
                      <strong>Cliques:</strong> {link.clicks || 0}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeSocialLink(link.id)}
                  className="p-2 hover:bg-destructive/10 rounded text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {localConfig.socialLinks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum link social adicionado. Clique em &quot;Adicionar Link&quot; para começar.
            </p>
          )}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-4">
        <button
          onClick={onSave}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          <Save className="w-4 h-4" />
          Salvar Alterações
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border rounded-lg hover:bg-accent"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

