"use strict";

class xfly
{
   constructor()
   {
      const flyName = "fly.gif";
      this.flyDiv = document.createElement("div");
      this.flyDiv.style.position = "absolute";
      //this.flyDiv.backgroundColor = "transparent"; //background-color: transparent;

      let flyImg = document.createElement("img");
      flyImg.src = flyName;
      this.flyDiv.appendChild(flyImg);
      this.flyDiv.addEventListener("click", (ev) => {this.scare_fly(3);});

      window.addEventListener("resize", () => {this.onResize();});

      this.timeOld = 0;

      this.direction       = 0;
      this.tangentialSpeed = 0.3;
      this.angularSpeed    = 0.05;

      this.doc_width  = document.body.clientWidth  - 60;
      this.doc_height = document.body.clientHeight - 60;

      this.stop         = 0;
      this.stop_stopper = 0;

      this.yp = Math.random() * this.doc_height;
      this.xp = Math.random() * this.doc_width;

   }

   onResize()
   {
      this.doc_width  = document.body.clientWidth  - 60;
      this.doc_height = document.body.clientHeight - 60;
   }

   moveXY(time)
   {
      let cosdir = Math.cos(this.direction);
      let sindir = Math.sin(this.direction);

      let d_yp = time * this.tangentialSpeed * (cosdir + sindir);
      let d_xp = time * this.tangentialSpeed * (cosdir - sindir);

      this.yp += d_yp;
      this.xp += d_xp;

      //reflect from UP/BOTTOM margins
      if(this.yp < 0) //bottom/up margin
      {
         this.yp += d_yp * ((d_yp < 0) ? -2 : 2);
         this.direction = -this.direction;
      }
       else if(this.yp > this.doc_height) //upper margin
      {
         this.yp -= d_yp * ((d_yp < 0) ? -2 : 2);
         this.direction = -this.direction;
      }
      //reflect from LEFT/RIGHT margins
      if(this.xp < 0) //left/right margin
      {
         this.xp += d_xp * ((d_xp < 0) ? -2 : 2);
         this.direction += Math.PI / 2 * (this.direction < 0) ? -1 : 1;
      }
       else if(this.xp > this.doc_width) //bottom margin
      {
         this.xp -= d_xp * ((d_xp < 0) ? -2 : 2);
         this.direction += Math.PI / 2 * (this.direction < 0) ? -1 : 1;
      }

      //console.log ("angularSpeed: " + this.angularSpeed);
      this.direction += this.angularSpeed * Math.PI;

      //normalize angle
      if(this.direction >= 4 * Math.PI) this.direction -= 4 * Math.PI;
      else  if(this.direction <= -4 * Math.PI) this.direction += 4 * Math.PI;

      //move
      this.flyDiv.style.left = this.xp;
      this.flyDiv.style.top  = this.yp;

   }

   stopper()
   {
      if(this.stop_stopper == 0)
         this.stop = this.stop == 1 ? 0 : 1; //Inverse
      setTimeout(() => this.stopper(), Math.random() * (this.stop ? 1500 : 5000)); //don't stop for too much time
   }
   scare_fly(scare)
   {
      if(scare == 3)
      {
         this.stop_stopper = 1;
         this.stop = 0;
         this.tangentialSpeed = 0.9;
         setTimeout(() => this.scare_fly(2), 5000);
      }else if(scare == 2)
      {
         this.tangentialSpeed = 0.6;
         setTimeout(() => this.scare_fly(1), 3000);
      }else if(scare == 1)
      {
         this.tangentialSpeed = 0.4;
         setTimeout(() => this.scare_fly(0), 2000);
      }else
      {
         this.tangentialSpeed = 0.3;
         this.stop_stopper = 0;
      }
   }
   direction_changer()
   {
      this.angularSpeed = 0.05 * Math.random() * (Math.random() > 0.5 ? 1 : -1); //random fi   *   random left/right
      setTimeout(() => this.direction_changer(), Math.random() * 200);
   }

   animate(time)
   {
      let dt = time - this.timeOld;
      this.timeOld = time;

      if (!this.stop) this.moveXY(dt);

      window.requestAnimationFrame ((t) => this.animate(t));
   }
   
   start()
   {
      this.animate(0);
      setTimeout(() => this.direction_changer(), 200);
      setTimeout(() => this.stopper(), Math.random() * 5000);
   }
	
	static appendFly ()
	{
      let base_fly = new xfly();
      document.body.appendChild(base_fly.flyDiv);
      return base_fly;
	}

}

function documentOnLoad()
{
   try
   {
		xfly.appendFly().start();
		xfly.appendFly().start();
		xfly.appendFly().start();

      //base_fly = new xfly();
      //document.body.appendChild(base_fly.flyDiv);
      //base_fly.start();
      //
      //base_fly = new xfly();
      //document.body.appendChild(base_fly.flyDiv);
      //base_fly.start();
      //
      //base_fly = new xfly();
      //document.body.appendChild(base_fly.flyDiv);
      //base_fly.start();


   }catch(err)
   {
      console.log(err.description);
   }
}

document.addEventListener('DOMContentLoaded',
    function (event)
    {
       documentOnLoad();
    }
);



