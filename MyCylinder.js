/**
* MyPyramid
* @constructor
*/
class MyPyramid extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var texIncrement = 1/this.slices;

        this.vertices.push(1, -0.5, 0);
        this.vertices.push(1, 0.5, 0);
        this.texCoords.push(0, 1);
        this.texCoords.push(0, 0);
        this.normals.push(1, 0, 0);
        this.normals.push(1, 0, 0);

        ang += alphaAng;

        for(var i = 1; i < this.slices + 1; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            //var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            //var caa=Math.cos(ang+alphaAng);

            this.vertices.push(ca, -0.5, -sa);
            this.vertices.push(ca, 0.5, -sa);
            //this.vertices.push(caa, -0.5, -saa);
            //this.vertices.push(caa, 0.5, -saa);
            
            this.indices.push(2 * i - 1,2 * i - 2, 2 * i + 1);
            this.indices.push(2 * i - 2 , 2 * i, 2 * i + 1);

            //Setting text coords
            this.texCoords.push(texIncrement * (i + 1), 1);
            this.texCoords.push(texIncrement * (i + 1), 0);

            
            // 
            var normal= [
                ca,
                0,
                -sa
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);



            /*
            normal = [
                caa, 0,  -saa
            ]

            
            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);

            //this.indices.push(6*i, (6*i+1) , (6*i+2) );
            */
            

            ang+=alphaAng;
        }

        //this.vertices.push(1, -0.5, 0);
        //this.vertices.push(1, 0.5, 0);
        //this.texCoords.push(1, 1);
        //this.texCoords.push(1, 0);

        ang = 0;
        for(var i = 0; i < this.slices; i++){
            
            var sa=Math.sin(ang);
            var ca=Math.cos(ang);

            this.vertices.push(ca, -0.5, -sa);
            ang += alphaAng;
            this.indices.push(this.slices * 2 + 2 + i , this.slices * 2 + 1 + i ,this.slices * 2 + 2);
        }
        //this.indices.push(this.slices * 2 + 2 + i , this.slices * 2 + 1 + i ,this.slices * 2 + 2);
        this.vertices.push(1, -0.5, 0);
        ang = 0;
        for(var i = 0; i < this.slices; i++){
            
            var sa=Math.sin(ang);
            var ca=Math.cos(ang);

            this.vertices.push(ca, 0.5, -sa);
            ang += alphaAng;
            this.indices.push(this.slices * 3 + 3, this.slices * 3 +2 + i, this.slices * 3 + 3 + i);
        }
        ang = 0;
        this.vertices.push(1, 0.5, 0);
        //this.indices.push(this.slices *2 + 4, this.slices * 2 + 3, this.slices * 2 + 2);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

