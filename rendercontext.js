class RenderContext {
    constructor(texname) {
        this.texname = texname;
        
        this.vertex_arr;
        this.normal_arr;
        this.index_arr;
        this.texcoord_arr;

        this.vertex_buffer;
        this.normal_buffer;
        this.index_buffer;
        this.texture_buffer;
        
        this.texture;
        this.modelmat = translate(0, 0, 0); //default modelmat is set to identity

        this.ka=vec4(1.0,1.0,1.0,1.0);
        this.kd=vec4(1.0,1.0,1.0,1.0);
        this.ks=vec4(1.0,1.0,1.0,1.0);
        this.shininess=1.0;
    }

}
