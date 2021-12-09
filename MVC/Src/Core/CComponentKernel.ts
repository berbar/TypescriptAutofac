

namespace iberbar.MVC.Core
{
    export abstract class CComponentKernel<T extends (...args: any) => any> implements System.IDisposable
    {
        public abstract Create( view: CView, ...args: Parameters<T> ): ReturnType<T>;
        public abstract ReCreate( view: CView ): void;
        public abstract Show( onshow: System.TCallback< () => void > ): void;
        public abstract Hide( onhide: System.TCallback< () => void > ): void;
        public abstract FadeIn( duration: number, onshow: System.TCallback< () => void > ): void;
        public abstract FadeOut( duration: number, onhide: System.TCallback< () => void > ): void;
        public abstract IsShow(): boolean;
        public abstract Dispose(): void;
    }
}
