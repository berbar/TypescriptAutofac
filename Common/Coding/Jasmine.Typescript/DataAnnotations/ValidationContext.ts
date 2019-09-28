

namespace iberbar.DataAnnotations
{
    export class CValidationContext
    {
        protected m_objectInstance: object = null;
        protected m_objectType: System.Reflection.CType = null;
        protected m_displayName: string = null;
        protected m_memberName: string = null;

        public constructor( instance: object )
        {
            this.m_objectInstance = instance;
            this.m_objectType = instance.GetType();
        }

        public set DisplayName( value: string )
        {
            this.m_displayName = value;
        }

        public get DisplayName(): string
        {
            return this.m_displayName;
        }

        public set MemberName( value: string )
        {
            this.m_memberName = value;
        }

        public get MemberName(): string
        {
            return this.m_memberName;
        }

        public get ObjectInstance(): object
        {
            return this.m_objectInstance;
        }
        
        public get ObjectType(): System.Reflection.CType
        {
            return this.m_objectType;
        }
    }
}