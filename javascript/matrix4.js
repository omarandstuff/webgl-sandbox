/*
Copyright (c) 2016, David De Anda. All rights reserved.
Copyrights licensed under MIT License
*/

class Matrix4
{

  constructor()
  {
    if(arguments.length == 0)
    {
      arguments[0] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    }
    
    if(arguments[0] instanceof Matrix4x4)
    {
      for(var i = 0; i < 4; i++)
      {
        for(var j = 0; j < 4; j++)
        {
          this["m_" + i + j] = arguments[0]["m_" + i + j]
        }
      }
    }
    else if(arguments[0] instanceof Array)
    {
      for(var i = 0; i < 4; i++)
      {
        for(var j = 0; j < 4; j++)
        {
          this["m_" + i + j] = arguments[0][(i * 4) + j]
        }
      }
    }
    else
    {
      for(var i = 0; i < 4; i++)
      {
        for(var j = 0; j < 4; j++)
        {
          this["m_" + i + j] = arguments[(i * 4) + j]
        }
      }
    }
  }


}
