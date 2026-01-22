'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface DreamAnalysis {
  interpretation?: string;
  symbols?: Array<{
    name: string;
    meaning: string;
    significance: string;
  }>;
  emotions?: Array<{
    name: string;
    intensity: number;
    color: string;
  }>;
  themes?: string[];
  advice?: string;
}

interface PostContentProps {
  content: string;
  analysis?: DreamAnalysis | null;
}

export function PostContent({ content, analysis }: PostContentProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <div className="space-y-12">
      {/* Main content */}
      <div className="article-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Analysis Section */}
      {analysis && (
        <div className="glass-card overflow-hidden">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-[rgb(var(--surface-hover))] transition-colors"
          >
            <div>
              <h3 className="text-xl font-display text-[rgb(var(--text-primary))]">Dream Analysis Details</h3>
              <p className="text-sm font-reading text-[rgb(var(--text-muted))] mt-1">
                AI-powered psychological interpretation
              </p>
            </div>
            {showAnalysis ? (
              <ChevronUp className="h-6 w-6 text-[rgb(var(--text-muted))]" />
            ) : (
              <ChevronDown className="h-6 w-6 text-[rgb(var(--text-muted))]" />
            )}
          </button>

          {showAnalysis && (
            <div className="px-6 pb-6 space-y-8 border-t border-[rgb(var(--border-color))] pt-6">
              {/* Symbols */}
              {analysis.symbols && analysis.symbols.length > 0 && (
                <div>
                  <h4 className="text-lg font-display text-[rgb(var(--text-primary))] mb-4">
                    Key Symbols
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {analysis.symbols.map((symbol, index) => (
                      <div
                        key={index}
                        className="bg-[rgb(var(--bg-tertiary))] rounded-lg p-4 border border-[rgb(var(--border-color))]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-ui font-medium text-[rgb(var(--text-primary))]">{symbol.name}</h5>
                          <span
                            className={`px-2 py-0.5 text-xs font-ui rounded ${
                              symbol.significance === 'high'
                                ? 'bg-[rgba(var(--accent-primary),0.15)] text-[rgb(var(--accent-primary))]'
                                : symbol.significance === 'medium'
                                ? 'bg-[rgba(var(--accent-secondary),0.15)] text-[rgb(var(--accent-secondary))]'
                                : 'bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-muted))]'
                            }`}
                          >
                            {symbol.significance}
                          </span>
                        </div>
                        <p className="text-sm font-reading text-[rgb(var(--text-secondary))]">{symbol.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emotions */}
              {analysis.emotions && analysis.emotions.length > 0 && (
                <div>
                  <h4 className="text-lg font-display text-[rgb(var(--text-primary))] mb-4">
                    Emotional Landscape
                  </h4>
                  <div className="space-y-3">
                    {analysis.emotions.map((emotion, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <span className="w-24 text-sm font-ui text-[rgb(var(--text-secondary))]">
                          {emotion.name}
                        </span>
                        <div className="flex-1 h-2 bg-[rgb(var(--bg-tertiary))] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${emotion.intensity}%`,
                              backgroundColor: emotion.color || 'rgb(var(--accent-primary))',
                            }}
                          />
                        </div>
                        <span className="text-sm font-ui text-[rgb(var(--text-muted))] w-12 text-right">
                          {emotion.intensity}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Themes */}
              {analysis.themes && analysis.themes.length > 0 && (
                <div>
                  <h4 className="text-lg font-display text-[rgb(var(--text-primary))] mb-4">
                    Themes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.themes.map((theme, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 font-ui bg-[rgba(var(--accent-primary),0.12)] text-[rgb(var(--accent-primary))] rounded-full text-sm border border-[rgba(var(--accent-primary),0.2)]"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Advice */}
              {analysis.advice && (
                <div className="rounded-lg p-6 border border-[rgb(var(--border-color))] bg-[rgb(var(--callout-insight))]">
                  <h4 className="text-lg font-display text-[rgb(var(--text-primary))] mb-3">
                    Reflection & Advice
                  </h4>
                  <p className="font-reading text-[rgb(var(--text-secondary))]">{analysis.advice}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
