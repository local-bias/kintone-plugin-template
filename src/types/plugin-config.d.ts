interface PluginManifest extends Record<string, any> {
  manifest_version: number;
  version: number | string;
  type: 'APP';
  name: {
    en?: string;
    ja?: string;
    zh?: string;
  };
  description: {
    en?: string;
    ja?: string;
    zh?: string;
  };
  icon?: string;
  homepage_url?: {
    ja?: string;
    en?: string;
  };
  desktop?: {
    js?: string[];
    css?: string[];
  };
  mobile?: {
    js?: string[];
    css?: string[];
  };
  config?: {
    html?: string;
    js?: string[];
    css?: string[];
    required_params?: string[];
  };
}

export interface PluginConfig extends Record<string, any> {
  manifest: {
    base: PluginManifest;
    prod: Partial<PluginManifest>;
    dev: Partial<PluginManifest>;
    standalone: Partial<PluginManifest>;
  };
}
