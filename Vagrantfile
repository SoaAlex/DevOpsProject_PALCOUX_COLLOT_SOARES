# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    # Do not pay attention to this parameter
    if Vagrant.has_plugin?("vagrant-vbguest")
      config.vm.provider :virtualbox do |vb|
        config.vbguest.auto_update = false
      end
    end
  
    # Define the VM
    config.vm.define "centos_server" do |server|
      # Specify the Vagrant box to use
      server.vm.box = "centos/7"
      # Specify the VM ip address
      server.vm.network :private_network, ip: "20.20.20.1"
      # Specify the VM specs when using the Virtualbox provisioner
      server.vm.provider "virtualbox" do |vb|
        vb.name =  "centos.server.local"
        # VM RAM in MB
        vb.memory = 2048
        # VM CPUs
        vb.cpus = 1
      end
      config.vm.provider "vmware_desktop" do |vmware|
        vmware.vmx["memsize"] = "2048"
        vmware.vmx["numvcpus"] = "1"
      end
    end
    
    # Start provisioning
    config.vm.provision "shell",
      inline: "echo Hello, World"
  
  end