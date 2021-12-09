

namespace iberbar.MVC.Core
{
    export abstract class CMapper
    {
        public abstract GetComponentKernelType(): System.Reflection.CType< Core.CComponentKernel<any> >;
        public abstract GetComponentTypes( viewType: System.Reflection.CType< CView > ): Array< System.Reflection.CType >;
    }
}
