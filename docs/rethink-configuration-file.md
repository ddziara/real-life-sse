https://rethinkdb.com/docs/config-file

# Configuration file options

The .conf file includes a number of options exclusively for the init<br>
script. The rest of the options are exactly the same as the ones that<br>
go on the command line to the RethinkDB server. For more details about<br>
these options run rethinkdb help.

The configuration file’s location depends on the startup system your<br>
distribution uses. A configuration file may also be specified on<br>
the command line with the --config-file option.

## Format

A sample .conf file is available with full comments. (It may already<br>
be installed on your distribution as default.conf.sample.)

The file uses a simple format of key=value, with one key specified per<br>
line. A simple configuration file that uses the default ports, assigns<br>
a server to a virtual group using server tags and joins an existing<br>
cluster might be:

```
server-name=Kismet
server-tag=default
server-tag=fremont_ca
join=layered:29015
daemon
```

## Supported options

For some options below, the default value depends on <name>, the name<br>
of the config file without the .conf extension.

* runuser and rungroup: specifies which user and group should be used<br>
  launch the Rethinkdb process.<br>
  *Default:* rethinkdb and rethinkdb .

* pid-file: the location of the file with the RethinkDB instance<br>
  process ID (used by the init script to communicate with the server<br>
  process).<br>
  *Default:* /var/run/rethinkdb/<name>/pid_file  

* directory: the data directory where database tables will be stored.<br>
  This location must be readable and writable by the user or group (or<br>
  both) specified by runuser and rungroup.<br>
  *Note:* It is best to create the database manually via<br>
  rethinkdb create --directory ... as runuser or rungroup before<br>
  enabling auto-start.<br>
  *Default:* /var/lib/rethinkdb/<name>/

* log-file: path to the log file.<br>
  *Default:* <directory>/log_file  

* bind: Address of local interfaces to listen on when accepting<br>
  connections. May be ‘all’ or an IP address, loopback addresses are<br>
  enabled by default.<br>
  *Default:* all local addresses

* bind-http: Similar to bind, but only for the web UI connection port.<br>
  This option will override bind for this port if both are specified<br>
  in the configuration file.  

* bind-cluster: Similar to bind, but only for the cluster connection<br>
  port. This option will override bind for this port if both are<br>
  specified in the configuration file.  

* bind-driver: Similar to bind, but only for the client driver<br>
  connection port. This option will override bind for this port if<br>
  both are specified in the configuration file.  

* http-tls-key: the filename of a private key to use with TLS for<br>
  the web administration console. Both http-tls-key and http-tls-cert<br>
  must be specified.  

* http-tls-cert: the filename of a TLS certificate to use for the web<br>
  administration console. Both http-tls-key and http-tls-cert must be<br>
  specified.  

* driver-tls-key: the filename of a private key to use with TLS for<br>
  client driver connections. Both driver-tls-key and driver-tls-cert<br>
  must be specified.  

* driver-tls-cert: the filename of a TLS certificate to use for client<br>
  driver connections. Both driver-tls-key and driver-tls-cert must be<br>
  specified.  

* driver-tls-ca: the filename of a CA certificate bundle to use for<br>
  verifying client driver connections. If specified, the server will<br>
  only accept connections from clients that provide a certificate<br>
  signed with the CA certificate.  

* cluster-tls-key: the filename of a private key to use with TLS for<br>
  cluster connections. All three cluster-tls-* configurations must be<br>
  specified.  

* cluster-tls-cert: the filename of a TLS certificate to use for<br>
  cluster connections. All three cluster-tls-* configurations must be<br>
  specified.  

* cluster-tls-ca: the filename of a CA certificate to use for<br>
  verifying cluster connections. All three cluster-tls-*<br>
  configurations must be specified.  

* tls-min-protocol: the minimum TLS protocol version the server<br>
  accepts, one of TLSv1, TLSv1.1, TLSv1.2.<br>
  *Default:* TLSv1.2  

* tls-ciphers: A list of TLS ciphers to use.<br>
  *Default:* EECDH+AESGCM  

* tls-ecdh-curve: A named elliptic curve to use for ECDHE.<br>
  *Default:* prime256v1  

* tls-dhparams: A filename containing parameters for DHE key<br>
  agreement; this is required if using DHE cipher suites, and unused<br>
  otherwise. At least a 2048-bit key is recommended.  

* canonical-address: Address that other rethinkdb instances will use<br>
  to connect to this machine. The address must be specified as<br>
  host:port if the instance uses a port other than 29015. This option<br>
  can be specified multiple times.  

* http-port, driver-port, and cluster-port: the web UI port (default<br>
  8080), the client driver port (default 28015), and intracluster<br>
  traffic port (default 29015), respectively. 

* join: The host:port of a node that Rethinkdb will connect to. It can<br>
  be specified multiple times.  

* port-offset All ports used locally will have this value added.<br>
  *Default:* 0  

* no-http-admin: Disable web administration console.

* cores: Number of cores to use.<br>
  *Default:* Number of cores of the CPU.

* cache-size: Size of the cache in MB.<br>
  *Default:* Half of the available RAM on startup.  

* io-threads: Number of simultaneous I/O operations can happen at<br>
  the same time.<br>
  *Default:* 64  

* direct-io: Use direct I/O for file system access.

* server-name: The name for this machine (as it will appear in<br>
  the metadata).<br>
  *Default:* Randomly chosen from a short list of names.

* server-tag: Specifies tags for this server, which can be used to<br>
  group servers together for administration purposes (for instance,<br>
  servers in the same data center). See Sharding and replication for<br>
  more details. To assign multiple tags to a server, repeat server-tag<br>
  lines for each tag.  

* cluster-reconnect-timeout: The amount of time, in seconds, this<br>
  server will try to reconnect to a cluster if it loses connection<br>
  before giving up.<br>
  *Default:* 86400  

* initial-password: Specifies the admin user password to use when<br>
  creating a new server instance. This option is ignored on subsequent<br>
  startups. If set to auto a randomly generated password will be used.<br>
  If ommitted, the admin account will have no password.  

  