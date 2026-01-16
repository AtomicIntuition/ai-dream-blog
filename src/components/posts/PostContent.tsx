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
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">Dream Analysis Details</h3>
              <p className="text-sm text-slate-400 mt-1">
                AI-powered psychological interpretation
              </p>
            </div>
            {showAnalysis ? (
              <ChevronUp className="h-6 w-6 text-slate-400" />
            ) : (
              <ChevronDown className="h-6 w-6 text-slate-400" />
            )}
          </button>

          {showAnalysis && (
            <div className="px-6 pb-6 space-y-8 border-t border-white/10 pt-6">
              {/* Symbols */}
              {analysis.symbols && analysis.symbols.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Key Symbols
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {analysis.symbols.map((symbol, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-lg p-4 border border-white/5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-white">{symbol.name}</h5>
                          <span
                            className={`px-2 py-0.5 text-xs rounded ${
                              symbol.significance === 'high'
                                ? 'bg-dream-500/30 text-dream-300'
                                : symbol.significance === 'medium'
                                ? 'bg-amber-500/30 text-amber-300'
                                : 'bg-slate-500/30 text-slate-300'
                            }`}
                          >
                            {symbol.significance}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">{symbol.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emotions */}
              {analysis.emotions && analysis.emotions.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Emotional Landscape
                  </h4>
                  <div className="space-y-3">
                    {analysis.emotions.map((emotion, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <span className="w-24 text-sm text-slate-300">
                          {emotion.name}
                        </span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${emotion.intensity}%`,
                              backgroundColor: emotion.color || '#8b5cf6',
                            }}
                          />
                        </div>
                        <span className="text-sm text-slate-400 w-12 text-right">
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
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Themes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.themes.map((theme, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-dream-500/20 text-dream-300 rounded-full text-sm"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Advice */}
              {analysis.advice && (
                <div className="bg-gradient-to-r from-dream-500/10 to-aurora-500/10 rounded-lg p-6 border border-dream-500/20">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Reflection & Advice
                  </h4>
                  <p className="text-slate-300">{analysis.advice}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
