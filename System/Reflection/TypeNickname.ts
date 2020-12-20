


namespace iberbar.System.Reflection
{
    @AttributeUsage( UAttributeTarget.Class, true, false )
    class CTypeNicknameAttribute extends CAttribute
    {
        private readonly m_nickname: string = null;

        public constructor( nickname: string )
        {
            super();
            this.m_nickname = nickname;
        }

        public get Nickname(): string
        {
            return this.m_nickname;
        }
    };


    export function TypeNickname( nickname: string ): UDecoratorFunctionType_ForClass
    {
        return AttributeDecorate( new CTypeNicknameAttribute( nickname ) );
    }

    export interface CType
    {
        GetNicknames(): Array< string >;
        GetNickname(): string;
    };


    CType.prototype.GetNicknames = function(): Array< string >
    {
        let nicknames = Array< string >();
        let nicknameAttrs = this.GetCustomAttributes( TypeOf( CTypeNicknameAttribute ), false );
        for ( let i = 0; i < nicknameAttrs.length; i ++ )
        {
            let n = nicknameAttrs[ i ];
            nicknames.push( n.Nickname );
        }
        nicknames.push( this.GetJsConstructor().name );
        return nicknames;
    }

    CType.prototype.GetNickname = function(): string
    {
        let nicknameAttr = this.GetCustomAttributeOne( TypeOf( CTypeNicknameAttribute ), false );
        if ( nicknameAttr == null )
        {
            return this.GetJsConstructor().name;
        }
        return nicknameAttr.Nickname;
    }
}

