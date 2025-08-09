export type Language = 'zh-CN' | 'en-US';

export interface Translation {
  // 通用
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    sort: string;
    refresh: string;
    copy: string;
    download: string;
    upload: string;
    convert: string;
    settings: string;
    about: string;
    help: string;
    language: string;
  };
  
  // 导航
  navigation: {
    home: string;
    convert: string;
    settings: string;
    about: string;
  };
  
  // 主页
  home: {
    title: string;
    subtitle: string;
    description: string;
    uploadPlaceholder: string;
    supportedFormats: string;
    images: string;
    audio: string;
    documents: string;
    video: string;
    ready: string;
    loading: string;
    notSupported: string;
    videoProcessingNote: string;
    here: string;
    localSupport: string;
    status: string;
  };
  
  // 转换页面
  convert: {
    title: string;
    selectFile: string;
    selectFormat: string;
    converting: string;
    completed: string;
    failed: string;
    downloadAll: string;
    removeFile: string;
    addMore: string;
    noFiles: string;
    addFiles: string;
    convertAll: string;
    processing: string;
    unknownFile: string;
    audioFile: string;
    videoFile: string;
    documentFile: string;
    imageFile: string;
    cannotConvert: string;
    runVertdServer: string;
    supportedFilesOnly: string;
    vertdNotFound: string;
    convertFile: string;
    downloadFile: string;
    removeAllFiles: string;
    setAllTo: string;
    notApplicable: string;
  };
  
  // 设置页面
  settings: {
    title: string;
    appearance: string;
    privacy: string;
    conversion: string;
    advanced: string;
    theme: {
      title: string;
      description: string;
      light: string;
      dark: string;
      system: string;
    };
    effects: {
      title: string;
      description: string;
      enable: string;
      disable: string;
    };
    filenameFormat: {
      title: string;
      description: string;
    };
    vertd: {
      title: string;
      status: string;
      available: string;
      commitId: string;
      unavailable: string;
      description1: string;
      description2: string;
      here: string;
      instanceUrl: string;
      urlPlaceholder: string;
      conversionSpeed: {
        title: string;
        description: string;
      };
      speeds: {
        verySlow: string;
        slower: string;
        slow: string;
        medium: string;
        fast: string;
        ultraFast: string;
      };
    };
    plausible: {
      title: string;
      description: string;
      here: string;
      optIn: string;
      optOut: string;
    };
  };
  
  // 关于页面
  about: {
    title: string;
    description: string;
    features: string;
    sponsors: string;
    donate: string;
    openSource: string;
    privacy: string;
  };
  
  // 上传组件
  uploader: {
    dragOrClick: string;
  };
}