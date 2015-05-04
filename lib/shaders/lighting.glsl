#pragma glslify: perturb = require('glsl-perturb-normal')
#pragma glslify: faceNormal = require('glsl-face-normal')


vec3 lighting(vec3 lightDir, vec3 lightColor, vec3 viewPos, vec3 normalMap, vec3 diffuseColor, float specular, float shininess, vec2 uv) {
  vec3 N = normalize(faceNormal(viewPos));
  vec3 V = normalize(viewPos);
  vec3 normal = perturb(normalMap, N, V, uv);

  vec3 totalDiffuseLight = vec3( 0.0 );
  vec3 totalSpecularLight = vec3( 0.0 );


  // diffuse
  float dotProduct = dot( normal, lightDir );
  float dirDiffuseWeight = max( dotProduct, 0.0 );
  totalDiffuseLight += lightColor * dirDiffuseWeight;
  // specular
  vec3 dirHalfVector = normalize( lightDir + V );
  float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );
  float dirSpecularWeight = specular * max( pow( dirDotNormalHalf, shininess ), 0.0 );
  float specularNormalization = ( shininess + 2.0 ) / 8.0;
  //    dirSpecular += specular * lightColor * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;
  vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lightDir, dirHalfVector ), 0.0 ), 5.0 );
  totalSpecularLight += schlick * lightColor * dirSpecularWeight * dirDiffuseWeight * specularNormalization;

  // return normal.xyz;
  return diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight;
}

#pragma glslify: export(light)