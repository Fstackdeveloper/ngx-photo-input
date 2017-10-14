

export class photoInputOptions {

  constructor(
    public theme: photoInputTheme = {circlePhoto:null,background:null},
  ) {  }

}


export class photoInputTheme {
    
    constructor(
            public circlePhoto,
            public background
          ) {  }
    
}